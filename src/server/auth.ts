import crypto from "node:crypto";
import { readJson, mutateJson } from "./blob-json";

const SESSION_COOKIE_NAME = "mc_admin_session";
const SESSION_MAX_AGE_SECONDS = 3600; // One hour; rotate the secret to revoke all sessions.

const inMemoryRateLimits = new Map<string, { count: number; until: number }>();

function checkInMemoryRateLimit(
  key: string,
  now: number,
): { allowed: boolean; retryAfterSeconds?: number } {
  if (inMemoryRateLimits.size > 1000) {
    for (const [k, v] of inMemoryRateLimits.entries()) {
      if (v.until <= now) inMemoryRateLimits.delete(k);
    }
  }

  const record = inMemoryRateLimits.get(key) || { count: 0, until: now + 15 * 60_000 };
  if (record.until <= now) {
    record.count = 0;
    record.until = now + 15 * 60_000;
  }

  if (record.count >= 5) {
    return {
      allowed: false,
      retryAfterSeconds: Math.ceil((record.until - now) / 1000),
    };
  }

  record.count += 1;
  inMemoryRateLimits.set(key, record);
  return { allowed: true };
}

// Atomic shared window, including successful attempts, to prevent parallel login bursts.
export async function checkLoginRateLimit(
  ip: string,
): Promise<{ allowed: boolean; retryAfterSeconds?: number }> {
  const key = crypto.createHmac("sha256", getSessionSecret()).update(ip).digest("hex");
  const now = Date.now();
  try {
    return await mutateJson<
      Record<string, { count: number; until: number }>,
      { allowed: boolean; retryAfterSeconds?: number }
    >("security/login-windows.json", {}, (records) => {
      const value = Object.fromEntries(
        Object.entries(records).filter(([, record]) => record.until > now),
      );
      const record = value[key] || { count: 0, until: now + 15 * 60_000 };
      if (record.count >= 5 || (!value[key] && Object.keys(value).length >= 1000))
        return {
          value,
          result: { allowed: false, retryAfterSeconds: Math.ceil((record.until - now) / 1000) },
        };
      value[key] = { ...record, count: record.count + 1 };
      return { value, result: { allowed: true } };
    });
  } catch (err) {
    console.warn("[Auth] Rate limit storage unavailable, using in-memory rate limiting:", err);
    return checkInMemoryRateLimit(key, now);
  }
}

const ALLOWED_ADMIN_ORIGINS = [
  "https://milestoneconsultancy.in",
  "https://www.milestoneconsultancy.in",
];

export function validateAdminOrigin(request: Request): { valid: boolean; error?: string } {
  const origin = request.headers.get("origin");
  const referer = request.headers.get("referer");
  const isDev = process.env.NODE_ENV !== "production" && !process.env.VERCEL;

  let requestOrigin: string | null = null;
  if (origin) {
    requestOrigin = origin;
  } else if (referer) {
    try {
      requestOrigin = new URL(referer).origin;
    } catch {
      requestOrigin = null;
    }
  }

  if (!requestOrigin) {
    if (isDev) return { valid: true };
    return { valid: false, error: "Missing Origin or Referer header on state-changing request" };
  }

  if (
    [
      ...ALLOWED_ADMIN_ORIGINS,
      ...(process.env.CAREERS_TRUSTED_ORIGINS || "")
        .split(",")
        .map((value) => value.trim())
        .filter((value) => /^https:\/\/[^/]+$/.test(value)),
    ].includes(requestOrigin)
  ) {
    return { valid: true };
  }

  if (
    isDev &&
    (requestOrigin.startsWith("http://localhost:") || requestOrigin.startsWith("http://127.0.0.1:"))
  ) {
    return { valid: true };
  }

  return { valid: false, error: `Unauthorized origin: ${requestOrigin}` };
}

function getSessionSecret(): string {
  const secret = process.env.CAREERS_SESSION_SECRET;
  if (!secret) {
    throw new Error(
      "CAREERS_SESSION_SECRET environment variable is missing. Session authentication cannot proceed.",
    );
  }

  return secret;
}

export function verifyAdminPassword(inputPassword: string): boolean {
  const configuredPassword = process.env.CAREERS_ADMIN_PASSWORD;
  if (!configuredPassword) {
    console.error("CAREERS_ADMIN_PASSWORD environment variable is not configured in Vercel.");
    return false;
  }

  const inputBuffer = Buffer.from(inputPassword);
  const targetBuffer = Buffer.from(configuredPassword);

  if (inputBuffer.length !== targetBuffer.length) {
    // Constant-time dummy comparison to mitigate timing attacks
    crypto.timingSafeEqual(inputBuffer, inputBuffer);
    return false;
  }

  return crypto.timingSafeEqual(inputBuffer, targetBuffer);
}

export function createSessionToken(): string {
  const timestamp = Date.now().toString();
  const nonce = crypto.randomBytes(16).toString("hex");
  const payload = `${timestamp}.${nonce}`;
  const hmac = crypto.createHmac("sha256", getSessionSecret()).update(payload).digest("hex");
  return `${payload}.${hmac}`;
}

export function verifySessionToken(token: string): boolean {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 3 || !/^\d+\.[a-f0-9]{32}\.[a-f0-9]{64}$/.test(token)) return false;

  const [timestampStr, nonce, receivedHmac] = parts;
  const timestamp = Number.parseInt(timestampStr, 10);
  if (Number.isNaN(timestamp)) return false;

  // Check age (24 hours)
  const age = Date.now() - timestamp;
  if (age < 0 || age > SESSION_MAX_AGE_SECONDS * 1000) {
    return false;
  }

  const payload = `${timestampStr}.${nonce}`;
  const expectedHmac = crypto
    .createHmac("sha256", getSessionSecret())
    .update(payload)
    .digest("hex");

  try {
    return crypto.timingSafeEqual(
      Buffer.from(receivedHmac, "hex"),
      Buffer.from(expectedHmac, "hex"),
    );
  } catch {
    return false;
  }
}

export function parseCookie(header: string | null, name: string): string | null {
  if (!header) return null;
  const cookies = header.split(";");
  for (const cookie of cookies) {
    const [k, v] = cookie.trim().split("=");
    if (k === name) {
      try {
        return decodeURIComponent(v || "");
      } catch {
        return null;
      }
    }
  }
  return null;
}

const inMemoryRevokedSessions = new Map<string, number>();

export async function verifyAdminSession(request: Request): Promise<boolean> {
  const cookieHeader = request.headers.get("cookie");
  const token = parseCookie(cookieHeader, SESSION_COOKIE_NAME);
  if (!token) return false;
  if (!verifySessionToken(token)) return false;

  const key = crypto.createHash("sha256").update(token).digest("hex");
  const memExpiry = inMemoryRevokedSessions.get(key);
  if (memExpiry && memExpiry > Date.now()) {
    return false;
  }

  try {
    const revoked = await readJson<Record<string, number>>("security/revoked-sessions.json", {});
    for (const [k, exp] of Object.entries(revoked.value)) {
      if (exp > Date.now()) inMemoryRevokedSessions.set(k, exp);
    }
    return !revoked.value[key];
  } catch {
    // If storage is temporarily unreachable, check in-memory revocation map
    return !inMemoryRevokedSessions.has(key);
  }
}

export function makeSessionCookieHeader(token: string, isProduction: boolean): string {
  const secureFlag = isProduction ? "; Secure" : "";
  return `${SESSION_COOKIE_NAME}=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${SESSION_MAX_AGE_SECONDS}${secureFlag}`;
}

export function makeLogoutCookieHeader(isProduction: boolean): string {
  const secureFlag = isProduction ? "; Secure" : "";
  return `${SESSION_COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0${secureFlag}`;
}

export async function revokeAdminSession(request: Request) {
  const token = parseCookie(request.headers.get("cookie"), SESSION_COOKIE_NAME);
  if (!token || !verifySessionToken(token)) return;
  const key = crypto.createHash("sha256").update(token).digest("hex");
  const expiry = Number(token.split(".")[0]) + SESSION_MAX_AGE_SECONDS * 1000;
  inMemoryRevokedSessions.set(key, expiry);

  await mutateJson<Record<string, number>, void>(
    "security/revoked-sessions.json",
    {},
    (records) => ({
      value: {
        ...Object.fromEntries(Object.entries(records).filter(([, exp]) => exp > Date.now())),
        [key]: expiry,
      },
      result: undefined,
    }),
  );
}
