import { z } from "zod";
const required = z.string().trim().min(2).max(150);
export const sampleReportSchema = z.object({
  locale: z.enum(["en", "ar"]),
  name: required,
  organisation: required,
  email: z.email().max(254),
  country: required,
  consent: z.literal(true),
  consentVersion: z.string().min(1).max(100),
  token: z.string().min(1).max(2048),
  website: z.string().max(0).default(""),
});
export type SampleReportRequest = z.infer<typeof sampleReportSchema>;
