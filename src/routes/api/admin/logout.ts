import { createFileRoute } from "@tanstack/react-router";
import { makeLogoutCookieHeader, validateAdminOrigin, revokeAdminSession } from "@/server/auth";

export const Route = createFileRoute("/api/admin/logout")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const originCheck = validateAdminOrigin(request);
        if (!originCheck.valid) {
          return new Response(JSON.stringify({ error: originCheck.error || "Forbidden origin" }), {
            status: 403,
            headers: { "Content-Type": "application/json" },
          });
        }

        try {
          await revokeAdminSession(request);
        } catch {
          return Response.json({ error: "Logout failed. Please retry." }, { status: 503 });
        }
        const isProd = process.env.NODE_ENV === "production";
        const cookieHeader = makeLogoutCookieHeader(isProd);

        return new Response(JSON.stringify({ success: true }), {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "Set-Cookie": cookieHeader,
          },
        });
      },
    },
  },
});
