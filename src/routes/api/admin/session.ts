import { createFileRoute } from "@tanstack/react-router";
import { verifyAdminSession } from "@/server/auth";

export const Route = createFileRoute("/api/admin/session")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const isAuthenticated = await verifyAdminSession(request);
        return new Response(JSON.stringify({ authenticated: isAuthenticated }), {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store, no-cache, must-revalidate",
          },
        });
      },
    },
  },
});
