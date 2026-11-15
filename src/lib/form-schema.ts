import { z } from "zod";
const short = z.string().trim().min(2).max(150);
export const enquirySchema = z
  .object({
    kind: z.enum(["contact", "demo", "coverage"]),
    locale: z.enum(["en", "ar"]),
    name: short,
    organisation: short,
    role: short,
    email: z.email().max(254),
    phone: z.string().trim().max(40).optional().default(""),
    country: short,
    regulator: z.string().trim().max(150).default(""),
    sector: z.string().trim().max(150).default(""),
    subject: z.string().trim().max(150).default(""),
    message: z.string().trim().max(5000).default(""),
    consent: z.literal(true),
    consentVersion: z.string().min(1).max(100),
    website: z.string().max(0),
    token: z.string().min(1).max(2048),
  })
  .superRefine((data, ctx) => {
    for (const field of data.kind === "contact"
      ? (["subject", "message"] as const)
      : (["regulator", "sector"] as const)) {
      if (data[field].length < 2)
        ctx.addIssue({ code: "custom", path: [field], message: "Required" });
    }
    if (data.kind === "coverage" && data.message.length < 2)
      ctx.addIssue({ code: "custom", path: ["message"], message: "Required" });
  });
export type Enquiry = z.infer<typeof enquirySchema>;
