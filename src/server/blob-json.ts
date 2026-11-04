import { get, put, head } from "@vercel/blob";

export class ConflictError extends Error {}

/**
 * Normalizes an ETag string to the canonical unquoted representation.
 * HTTP headers wrap ETags in double quotes (e.g. `"1a2b3c..."`) and may include
 * a weakness indicator (e.g. `W/"1a2b3c..."`). Vercel Blob's REST API stores
 * and matches the unquoted ETag string directly.
 */
export function normalizeEtag(etag?: string | null): string | undefined {
  if (!etag) return undefined;
  const clean = etag
    .trim()
    .replace(/^W\//i, "")
    .replace(/^["']|["']$/g, "")
    .trim();
  return clean || undefined;
}

export function isNotFoundError(error: unknown): boolean {
  if (!(error instanceof Error)) return false;
  return (
    error.name === "BlobNotFoundError" ||
    error.message.includes("404") ||
    error.message.includes("not found") ||
    error.message.includes("could not be found") ||
    error.message.includes("The requested blob does not exist")
  );
}

export function isPreconditionFailed(error: unknown): boolean {
  if (!(error instanceof Error)) return false;
  return (
    error.name === "BlobPreconditionFailedError" ||
    error.message.includes("precondition") ||
    error.message.includes("Precondition") ||
    error.message.includes("412") ||
    error.message.includes("ETag mismatch")
  );
}

export interface BlobSnapshot<T> {
  value: T;
  etag?: string;
  access: "public" | "private";
}

export async function readJson<T>(path: string, fallback: T): Promise<BlobSnapshot<T>> {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) throw new Error("Careers storage is not configured");

  // Step 1: Use head() to fetch canonical metadata, exact unquoted ETag, and access mode
  // bypassing any CDN cache to ensure we never operate with stale concurrency tokens.
  try {
    const meta = await head(path, { token });
    if (meta && meta.url) {
      const access: "public" | "private" = meta.url.includes(".private.blob.")
        ? "private"
        : "public";
      const canonicalEtag = normalizeEtag(meta.etag);

      // Fetch the blob content using the exact URL with strict cache-busting headers
      const res = await get(meta.url, {
        access,
        useCache: false,
        token,
        headers: {
          "Cache-Control": "no-cache, no-store, max-age=0, must-revalidate",
          Pragma: "no-cache",
        },
      });

      if (res && res.stream) {
        const text = await new Response(res.stream).text();
        if (text && text.trim()) {
          try {
            const parsed = JSON.parse(text) as T;
            return {
              value: parsed,
              etag: canonicalEtag || normalizeEtag(res.blob?.etag),
              access,
            };
          } catch {
            return { value: fallback, etag: canonicalEtag, access };
          }
        }
        return { value: fallback, etag: canonicalEtag, access };
      }
    }
  } catch (headError) {
    if (isNotFoundError(headError)) {
      return { value: fallback, etag: undefined, access: "public" };
    }
    // If head() encountered any other transient error, fallback to get() attempts below
  }

  // Step 2: Fallback to direct get() trying public first, then private
  for (const access of ["public", "private"] as const) {
    try {
      const res = await get(path, {
        access,
        useCache: false,
        token,
        headers: {
          "Cache-Control": "no-cache, no-store, max-age=0, must-revalidate",
          Pragma: "no-cache",
        },
      });

      if (res && res.stream) {
        const text = await new Response(res.stream).text();
        const cleanEtag = normalizeEtag(res.blob?.etag);
        if (text && text.trim()) {
          try {
            const parsed = JSON.parse(text) as T;
            return { value: parsed, etag: cleanEtag, access };
          } catch {
            return { value: fallback, etag: cleanEtag, access };
          }
        }
        return { value: fallback, etag: cleanEtag, access };
      }
    } catch (err) {
      if (isNotFoundError(err)) {
        continue;
      }
      throw err;
    }
  }

  return { value: fallback, etag: undefined, access: "public" };
}

/** Storage-level compare-and-swap protects independent server instances. */
export async function mutateJson<T, R>(
  path: string,
  fallback: T,
  change: (value: T) => { value: T; result: R },
): Promise<R> {
  const maxAttempts = 5;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    // 1. Fresh read on every attempt with live ETag & detected access mode
    const snapshot = await readJson(path, fallback);

    // 2. Apply mutation to THAT current value
    const next = change(snapshot.value);
    const payload = JSON.stringify(next.value);

    // 3. Attempt conditional write against THAT version
    const cleanEtag = normalizeEtag(snapshot.etag);
    const targetAccess = snapshot.access || "public";

    try {
      await put(path, payload, {
        access: targetAccess,
        addRandomSuffix: false,
        allowOverwrite: true,
        ...(cleanEtag ? { ifMatch: cleanEtag } : {}),
        token: process.env.BLOB_READ_WRITE_TOKEN,
      });

      return next.result;
    } catch (err) {
      // If precondition failed (412) or ETag mismatch occurred due to a competing write:
      if (isPreconditionFailed(err)) {
        if (attempt < maxAttempts - 1) {
          // Jittered backoff prevents synchronized lockstep contention between concurrent writers
          const delayMs = 40 * Math.pow(2, attempt) + Math.floor(Math.random() * 40);
          await new Promise((resolve) => setTimeout(resolve, delayMs));
          // Re-read current JSON, obtain fresh ETag, and retry
          continue;
        }
      }

      // If it was not a 412 precondition error, re-throw immediately
      throw err;
    }
  }

  throw new ConflictError("Another administrator changed these records. Reload and retry.");
}
