import { z } from "zod";

export const JobStatusSchema = z.enum(["ACTIVE", "CLOSED", "DRAFT"]);

const dateField = z
  .string()
  .trim()
  .max(50)
  .refine((value) => !value || Number.isFinite(Date.parse(value)), "Enter a valid date")
  .transform((value) => (value ? new Date(value).toISOString().slice(0, 10) : ""));
const employmentType = z.enum([
  "Full Time",
  "Part Time",
  "Contract",
  "Internship",
  "Temporary",
  "Volunteer",
]);
const JobFields = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters")
    .max(120, "Title must not exceed 120 characters"),
  slug: z
    .string()
    .trim()
    .min(3, "Slug must be at least 3 characters")
    .max(120, "Slug must not exceed 120 characters")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase alphanumeric with hyphens"),
  status: JobStatusSchema.default("ACTIVE"),
  department: z.string().trim().min(2).max(60),
  designation: z.string().trim().max(100).optional(),
  location: z.string().trim().min(2).max(100).default("Nashik, Maharashtra"),
  experience: z.string().trim().min(1).max(50).default("2+ Years"),
  employmentType: employmentType.default("Full Time"),
  skills: z.array(z.string().trim().max(50)).max(30).default([]),
  postedDate: dateField.optional(),
  deadline: dateField.optional(),
  salary: z.string().trim().max(80).optional(),
  featured: z.boolean().default(false),
  shortDescription: z.string().trim().max(500).default(""),
  jobDescription: z.string().trim().max(5000).default(""),
  responsibilities: z.array(z.string().trim().max(500)).max(30).default([]),
  qualifications: z.string().trim().max(1000).default(""),
  requiredExperience: z.string().trim().max(1000).default(""),
  preferredSkills: z.array(z.string().trim().max(100)).max(30).default([]),
  otherInformation: z.string().trim().max(2000).optional(),
  heroImage: z
    .string()
    .trim()
    .max(500)
    .refine(
      (value) => !value || /^https:\/\//.test(value) || /^\/(?!\/)/.test(value),
      "Use an HTTPS image URL or local path",
    )
    .optional(),
});

function checkDates(data: { postedDate?: string; deadline?: string }, context: z.RefinementCtx) {
  if (data.postedDate && data.deadline && Date.parse(data.deadline) < Date.parse(data.postedDate))
    context.addIssue({
      code: "custom",
      path: ["deadline"],
      message: "Deadline must be on or after the posted date",
    });
}
export const CreateJobSchema = JobFields.superRefine(checkDates);
export const UpdateJobSchema = JobFields.partial()
  .extend({
    id: z.string().trim().min(1).max(100),
    updatedAt: z.string().datetime().optional(),
  })
  .superRefine(checkDates);

export const CareerMasterItemSchema = z.object({
  id: z.string().trim().min(1).max(80),
  name: z.string().trim().min(1).max(80),
  status: z.enum(["ACTIVE", "INACTIVE"]),
});

export const CareerMastersSchema = z.object({
  departments: z.array(CareerMasterItemSchema).max(50),
  designations: z.array(CareerMasterItemSchema).max(100),
  locations: z.array(CareerMasterItemSchema).max(50),
});

export const LoginSchema = z.object({
  password: z
    .string()
    .min(1, "Password is required")
    .max(200, "Password length exceeds security limit"),
});
