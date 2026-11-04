import { readRequestJson } from "@/server/request-body";
import { createFileRoute } from "@tanstack/react-router";
import { verifyAdminSession, validateAdminOrigin } from "@/server/auth";
import { CreateJobSchema, UpdateJobSchema } from "@/server/validation";
import {
  ConflictError,
  getAllJobs,
  createJob,
  updateJob,
  deleteJob,
  isBlobConfigError,
} from "@/server/careers-storage";

export const Route = createFileRoute("/api/admin/jobs")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        if (!(await verifyAdminSession(request))) {
          return new Response(JSON.stringify({ error: "Unauthorized" }), {
            status: 401,
            headers: { "Content-Type": "application/json" },
          });
        }

        try {
          const jobs = await getAllJobs();
          return new Response(JSON.stringify(jobs), {
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
                error:
                  "Careers storage is not configured. Please set BLOB_READ_WRITE_TOKEN in Vercel project settings.",
              }),
              {
                status: 503,
                headers: { "Content-Type": "application/json" },
              },
            );
          }
          console.error("[API Admin Jobs GET] Failure:", err);
          const message =
            err instanceof ConflictError
              ? err.message
              : "Unable to save or load vacancies. Please retry.";
          return new Response(JSON.stringify({ error: message }), {
            status: err instanceof ConflictError ? 409 : 500,
            headers: { "Content-Type": "application/json" },
          });
        }
      },

      POST: async ({ request }) => {
        const originCheck = validateAdminOrigin(request);
        if (!originCheck.valid) {
          return new Response(JSON.stringify({ error: originCheck.error || "Forbidden origin" }), {
            status: 403,
            headers: { "Content-Type": "application/json" },
          });
        }

        if (!(await verifyAdminSession(request))) {
          return new Response(JSON.stringify({ error: "Unauthorized" }), {
            status: 401,
            headers: { "Content-Type": "application/json" },
          });
        }

        try {
          const body = await readRequestJson(request).catch(() => null);
          const parseResult = CreateJobSchema.safeParse(body);
          if (!parseResult.success) {
            return new Response(
              JSON.stringify({
                error: "Invalid job data",
                details: parseResult.error.flatten().fieldErrors,
              }),
              {
                status: 400,
                headers: { "Content-Type": "application/json" },
              },
            );
          }

          const validated = parseResult.data;
          const newJob = await createJob({
            ...validated,
            title: validated.title,
            slug: validated.slug,
            status: validated.status,
            department: validated.department,
            location: validated.location,
            experience: validated.experience,
            employmentType: validated.employmentType,
            skills: validated.skills,
            postedDate: validated.postedDate || new Date().toISOString(),
            deadline: validated.deadline,
            salary: validated.salary,
            featured: validated.featured,
            shortDescription: validated.shortDescription,
            jobDescription: validated.jobDescription,
            responsibilities: validated.responsibilities,
            qualifications: validated.qualifications,
            requiredExperience: validated.requiredExperience,
            preferredSkills: validated.preferredSkills,
            otherInformation: validated.otherInformation,
          });

          return new Response(JSON.stringify(newJob), {
            status: 201,
            headers: { "Content-Type": "application/json" },
          });
        } catch (err) {
          if (isBlobConfigError(err)) {
            return new Response(
              JSON.stringify({
                error:
                  "Careers storage is not configured. Please set BLOB_READ_WRITE_TOKEN in Vercel project settings.",
              }),
              {
                status: 503,
                headers: { "Content-Type": "application/json" },
              },
            );
          }
          console.error("[API Admin Jobs POST] Failure:", err);
          const message =
            err instanceof ConflictError
              ? err.message
              : "Unable to save or load vacancies. Please retry.";
          return new Response(JSON.stringify({ error: message }), {
            status: err instanceof ConflictError ? 409 : 500,
            headers: { "Content-Type": "application/json" },
          });
        }
      },

      PUT: async ({ request }) => {
        const originCheck = validateAdminOrigin(request);
        if (!originCheck.valid) {
          return new Response(JSON.stringify({ error: originCheck.error || "Forbidden origin" }), {
            status: 403,
            headers: { "Content-Type": "application/json" },
          });
        }

        if (!(await verifyAdminSession(request))) {
          return new Response(JSON.stringify({ error: "Unauthorized" }), {
            status: 401,
            headers: { "Content-Type": "application/json" },
          });
        }

        try {
          const body = await readRequestJson(request).catch(() => null);
          const parseResult = UpdateJobSchema.safeParse(body);
          if (!parseResult.success) {
            return new Response(
              JSON.stringify({
                error: "Invalid job update data",
                details: parseResult.error.flatten().fieldErrors,
              }),
              {
                status: 400,
                headers: { "Content-Type": "application/json" },
              },
            );
          }

          const validated = parseResult.data;
          const updated = await updateJob(validated.id, validated);
          if (!updated) {
            return new Response(JSON.stringify({ error: "Job not found." }), {
              status: 404,
              headers: { "Content-Type": "application/json" },
            });
          }

          return new Response(JSON.stringify(updated), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
        } catch (err) {
          if (isBlobConfigError(err)) {
            return new Response(
              JSON.stringify({
                error:
                  "Careers storage is not configured. Please set BLOB_READ_WRITE_TOKEN in Vercel project settings.",
              }),
              {
                status: 503,
                headers: { "Content-Type": "application/json" },
              },
            );
          }
          console.error("[API Admin Jobs PUT] Failure:", err);
          const message =
            err instanceof ConflictError
              ? err.message
              : "Unable to save or load vacancies. Please retry.";
          return new Response(JSON.stringify({ error: message }), {
            status: err instanceof ConflictError ? 409 : 500,
            headers: { "Content-Type": "application/json" },
          });
        }
      },

      DELETE: async ({ request }) => {
        const originCheck = validateAdminOrigin(request);
        if (!originCheck.valid) {
          return new Response(JSON.stringify({ error: originCheck.error || "Forbidden origin" }), {
            status: 403,
            headers: { "Content-Type": "application/json" },
          });
        }

        if (!(await verifyAdminSession(request))) {
          return new Response(JSON.stringify({ error: "Unauthorized" }), {
            status: 401,
            headers: { "Content-Type": "application/json" },
          });
        }

        try {
          const url = new URL(request.url);
          const id = url.searchParams.get("id");
          if (!id) {
            return new Response(JSON.stringify({ error: "Job ID is required." }), {
              status: 400,
              headers: { "Content-Type": "application/json" },
            });
          }

          const success = await deleteJob(id);
          if (!success) {
            return new Response(JSON.stringify({ error: "Job not found." }), {
              status: 404,
              headers: { "Content-Type": "application/json" },
            });
          }

          return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
        } catch (err) {
          if (isBlobConfigError(err)) {
            return new Response(
              JSON.stringify({
                error:
                  "Careers storage is not configured. Please set BLOB_READ_WRITE_TOKEN in Vercel project settings.",
              }),
              {
                status: 503,
                headers: { "Content-Type": "application/json" },
              },
            );
          }
          console.error("[API Admin Jobs DELETE] Failure:", err);
          const message =
            err instanceof ConflictError
              ? err.message
              : "Unable to save or load vacancies. Please retry.";
          return new Response(JSON.stringify({ error: message }), {
            status: err instanceof ConflictError ? 409 : 500,
            headers: { "Content-Type": "application/json" },
          });
        }
      },
    },
  },
});
