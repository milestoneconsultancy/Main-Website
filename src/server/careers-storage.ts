import { randomUUID } from "node:crypto";
import { type Job, type CareerMasters, initialMasters, initialJobs } from "@/config/careers";
import { isJobOpen } from "@/lib/job-policy";
import { readJson, mutateJson, ConflictError } from "./blob-json";
import { CreateJobSchema } from "./validation";

const JOBS = "vacancies/jobs.json";
const MASTERS = "vacancies/masters.json";

export { ConflictError };

export function isVercelBlobConfigured() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN?.trim());
}

export function isBlobConfigError(error: unknown) {
  return (
    error instanceof Error && /Careers storage is not configured|No token found/.test(error.message)
  );
}

function sanitizeJobs(value: unknown): Job[] {
  if (Array.isArray(value) && value.length > 0) {
    return value as Job[];
  }
  if (!Array.isArray(value) && value && typeof value === "object") {
    const record = value as Record<string, unknown>;
    const candidate = record.jobs || record.vacancies;
    if (Array.isArray(candidate) && candidate.length > 0) return candidate as Job[];
  }
  return initialJobs;
}

export async function getAllJobs(): Promise<Job[]> {
  const { value } = await readJson<Job[]>(JOBS, initialJobs);
  return sanitizeJobs(value);
}

export async function getPublicJobs() {
  return (await getAllJobs()).filter((job) => isJobOpen(job));
}

export async function getJobBySlug(slug: string) {
  return (await getAllJobs()).find((job) => job.slug === slug && job.status !== "DRAFT") ?? null;
}

function unique(jobs: Job[], slug: string, id?: string) {
  if (jobs.some((job) => job.slug === slug && job.id !== id))
    throw new ConflictError("This URL slug is already used. Choose another slug.");
}

export async function createJob(data: Omit<Job, "id" | "createdAt" | "updatedAt">): Promise<Job> {
  const validated = CreateJobSchema.parse(data);
  const now = new Date().toISOString();
  const job: Job = {
    ...validated,
    postedDate: validated.postedDate || now,
    id: randomUUID(),
    createdAt: now,
    updatedAt: now,
  };
  return mutateJson<Job[], Job>(JOBS, initialJobs, (stored) => {
    const jobs = sanitizeJobs(stored);
    unique(jobs, job.slug);
    return { value: [job, ...jobs], result: job };
  });
}

export async function updateJob(id: string, updates: Partial<Job>): Promise<Job | null> {
  return mutateJson<Job[], Job | null>(JOBS, initialJobs, (stored) => {
    const jobs = sanitizeJobs(stored);
    const old = jobs.find((job) => job.id === id);
    if (!old) return { value: jobs, result: null };
    if (updates.updatedAt && updates.updatedAt !== old.updatedAt)
      throw new ConflictError("This vacancy has changed. Reload before editing again.");
    const validated = CreateJobSchema.parse({ ...old, ...updates });
    unique(jobs, validated.slug, id);
    const job: Job = {
      ...old,
      ...validated,
      id: old.id,
      createdAt: old.createdAt,
      updatedAt: new Date().toISOString(),
    };
    return { value: jobs.map((item) => (item.id === id ? job : item)), result: job };
  });
}

export async function deleteJob(id: string): Promise<boolean> {
  return mutateJson<Job[], boolean>(JOBS, initialJobs, (stored) => {
    const jobs = sanitizeJobs(stored);
    const exists = jobs.some((job) => job.id === id);
    return {
      value: jobs.filter((job) => job.id !== id),
      result: exists,
    };
  });
}

export async function getMasters(): Promise<CareerMasters> {
  return (await readJson(MASTERS, initialMasters)).value;
}

export async function updateMasters(value: CareerMasters): Promise<CareerMasters> {
  return mutateJson<CareerMasters, CareerMasters>(MASTERS, initialMasters, () => {
    return {
      value,
      result: value,
    };
  });
}
