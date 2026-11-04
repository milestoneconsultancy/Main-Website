import type { Job } from "@/config/careers";

/** Date-only deadlines close at the end of that day in India. Legacy dates remain readable. */
export function deadlineTime(value?: string): number {
  if (!value) return Infinity;
  const parsed = new Date(value);
  if (!Number.isFinite(parsed.getTime())) return NaN;
  return Date.parse(`${parsed.toISOString().slice(0, 10)}T23:59:59.999+05:30`);
}
export function isJobOpen(job: Job, now = Date.now()): boolean {
  return job.status === "ACTIVE" && deadlineTime(job.deadline) >= now;
}
