import { readRequestJson } from "@/server/request-body";
import { createFileRoute } from "@tanstack/react-router";
import { verifyAdminSession, validateAdminOrigin } from "@/server/auth";
import { CareerMastersSchema } from "@/server/validation";
import {
  getMasters,
  updateMasters,
  isBlobConfigError,
  ConflictError,
} from "@/server/careers-storage";

export const Route = createFileRoute("/api/admin/masters")({
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
          const masters = await getMasters();
          return new Response(JSON.stringify(masters), {
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
          console.error("[API Admin Masters GET] Failure:", err);
          const message =
            err instanceof ConflictError
              ? err.message
              : "Settings could not be saved or loaded. Please retry.";
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
          const parseResult = CareerMastersSchema.safeParse(body);
          if (!parseResult.success) {
            return new Response(
              JSON.stringify({
                error: "Invalid masters structure.",
                details: parseResult.error.flatten().fieldErrors,
              }),
              {
                status: 400,
                headers: { "Content-Type": "application/json" },
              },
            );
          }

          const saved = await updateMasters(parseResult.data);
          return new Response(JSON.stringify(saved), {
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
          console.error("[API Admin Masters PUT] Failure:", err);
          const message =
            err instanceof Error ? err.message : "Failed to persist masters to Vercel Blob.";
          return new Response(JSON.stringify({ error: message }), {
            status: err instanceof ConflictError ? 409 : 500,
            headers: { "Content-Type": "application/json" },
          });
        }
      },
    },
  },
});
