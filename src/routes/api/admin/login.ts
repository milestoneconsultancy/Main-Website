import { readRequestJson } from "@/server/request-body";
import { LoginSchema } from "@/server/validation";
import { validateAdminOrigin } from "@/server/auth";
import { createFileRoute } from "@tanstack/react-router";
import {
  verifyAdminPassword,
  createSessionToken,
  makeSessionCookieHeader,
  checkLoginRateLimit,
} from "@/server/auth";

export const Route = createFileRoute("/api/admin/login")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        if (!validateAdminOrigin(request).valid)
          return Response.json({ error: "Forbidden origin" }, { status: 403 });
        if (!process.env.CAREERS_ADMIN_PASSWORD || !process.env.CAREERS_SESSION_SECRET)
          return Response.json({ error: "Sign-in is temporarily unavailable." }, { status: 503 });
        const clientIp =
          request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
          request.headers.get("x-real-ip") ||
          "127.0.0.1";

        // 1. Rate limiting
        let rateCheck;
        try {
          rateCheck = await checkLoginRateLimit(clientIp);
        } catch {
          return Response.json({ error: "Sign-in is temporarily unavailable." }, { status: 503 });
        }
        if (!rateCheck.allowed) {
          return new Response(
            JSON.stringify({
              error: `Too many failed attempts. Please retry after ${rateCheck.retryAfterSeconds} seconds.`,
            }),
            {
              status: 429,
              headers: { "Content-Type": "application/json" },
            },
          );
        }

        try {
          const parsed = LoginSchema.safeParse(await readRequestJson(request, 1024));
          if (!parsed.success)
            return Response.json(
              { error: "Enter a password of 1–200 characters." },
              { status: 400 },
            );
          const { password } = parsed.data;

          if (!password || typeof password !== "string") {
            return new Response(JSON.stringify({ error: "Password is required." }), {
              status: 400,
              headers: { "Content-Type": "application/json" },
            });
          }

          // 2. Validate password against CAREERS_ADMIN_PASSWORD
          const isValid = verifyAdminPassword(password);
          if (!isValid) {
            return new Response(JSON.stringify({ error: "Invalid admin credentials." }), {
              status: 401,
              headers: { "Content-Type": "application/json" },
            });
          }

          // 3. Reset rate limit on success

          // 4. Issue secure HttpOnly session cookie
          const token = createSessionToken();
          const isProd = process.env.NODE_ENV === "production";
          const cookieHeader = makeSessionCookieHeader(token, isProd);

          return new Response(
            JSON.stringify({ success: true, message: "Authenticated successfully" }),
            {
              status: 200,
              headers: {
                "Content-Type": "application/json",
                "Set-Cookie": cookieHeader,
              },
            },
          );
        } catch {
          return new Response(JSON.stringify({ error: "Invalid request payload." }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
          });
        }
      },
    },
  },
});
