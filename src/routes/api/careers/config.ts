import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/careers/config")({
  server: {
    handlers: {
      GET: async () => {
        const hrEmail = process.env.CAREERS_HR_EMAIL || "info@milestoneconsultancy.in";
        return new Response(JSON.stringify({ hrEmail }), {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "public, max-age=60, s-maxage=300",
          },
        });
      },
    },
  },
});
