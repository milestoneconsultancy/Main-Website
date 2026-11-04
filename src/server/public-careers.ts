import { createServerFn } from "@tanstack/react-start";
import { getJobBySlug } from "./careers-storage";

export const loadPublicJob = createServerFn({ method: "GET" })
  .inputValidator((data: string) => data)
  .handler(async ({ data }) => {
    try {
      return await getJobBySlug(data);
    } catch {
      throw new Error("Vacancy details are temporarily unavailable. Please try again later.");
    }
  });
