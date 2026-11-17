import { z } from "zod";
const short = z.string().trim().min(2).max(150);
export const enquirySchema = z
  .object({
    kind: z.enum(["contact", "demo", "coverage"]),
    locale: z.enum(["en", "ar"]),
    name: short,
    organisation: short,
    role: z.string().trim().max(150).default(""),
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
    // The client's G4 demo request has exactly six applicant fields:
    // name, organisation, work email, sector, country and message. It must
    // not require role or regulator; those are relevant to other enquiries.
    const required = data.kind === "contact"
      ? ["role", "subject", "message"] as const
      : data.kind === "coverage"
        ? ["role", "regulator", "sector", "message"] as const
        : ["sector", "message"] as const;
    for (const field of required) {
      if (data[field].length < 2)
        ctx.addIssue({ code: "custom", path: [field], message: "Required" });
    }
  });
export type Enquiry = z.infer<typeof enquirySchema>;
