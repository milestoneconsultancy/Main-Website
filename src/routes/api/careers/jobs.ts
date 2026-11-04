import { createFileRoute } from "@tanstack/react-router";
import { getPublicJobs, getJobBySlug, isBlobConfigError } from "@/server/careers-storage";

export const Route = createFileRoute("/api/careers/jobs")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        try {
          const url = new URL(request.url);
          const slug = url.searchParams.get("slug");

          if (slug) {
            const job = await getJobBySlug(slug);
            if (!job) {
              return new Response(JSON.stringify({ error: "Job not found" }), {
                status: 404,
                headers: { "Content-Type": "application/json" },
              });
            }
            return new Response(JSON.stringify(job), {
              status: 200,
              headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-store",
              },
            });
          }

          const publicJobs = await getPublicJobs();
          return new Response(JSON.stringify(publicJobs), {
            status: 200,
            headers: {
              "Content-Type": "application/json",
              "Cache-Control": "no-store",
            },
          });
        } catch (err) {
          if (isBlobConfigError(err)) {
            return new Response(
              JSON.stringify({
                error: "Vacancies are temporarily unavailable. Please try again later.",
              }),
              {
                status: 503,
                headers: { "Content-Type": "application/json" },
              },
            );
          }

          console.error("[API Careers Jobs] Server error:", err);
          const message = "Vacancies are temporarily unavailable. Please try again later.";
          return new Response(JSON.stringify({ error: message }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
          });
        }
      },
    },
  },
});
