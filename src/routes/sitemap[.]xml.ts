import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { projects } from "@/config/projects";
import type { Job } from "@/config/careers";
import { getPublicJobs } from "@/server/careers-storage";
import { siteUrl } from "@/config/schema";

const staticEntries = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/about", changefreq: "monthly", priority: "0.8" },
  { path: "/services", changefreq: "monthly", priority: "0.9" },
  { path: "/projects", changefreq: "weekly", priority: "0.9" },
  { path: "/careers", changefreq: "weekly", priority: "0.8" },
  { path: "/contact", changefreq: "monthly", priority: "0.7" },
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const projectEntries = projects.map((p) => ({
          path: `/projects/${p.slug}`,
          changefreq: "monthly",
          priority: "0.8",
        }));

        let activeJobs: Job[] = [];
        try {
          activeJobs = await getPublicJobs();
        } catch {
          /* Omit unknown vacancies. */
        }

        const careerEntries = activeJobs.map((j) => ({
          path: `/careers/${j.slug}`,
          changefreq: "weekly",
          priority: "0.7",
        }));

        const allEntries = [...staticEntries, ...projectEntries, ...careerEntries];

        const urls = allEntries.map(
          (e) => `  <url>
    <loc>${siteUrl}${e.path}</loc>
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority}</priority>
  </url>`,
        );

        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`;

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml; charset=UTF-8",
            "Cache-Control": "no-store",
          },
        });
      },
    },
  },
});
