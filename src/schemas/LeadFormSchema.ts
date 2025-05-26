import { z } from "zod";

export const leadSchema = z.object({
  first_name: z
    .string()
    .min(1, { message: "First name is required" })
    .max(100, { message: "First name cannot exceed 100 characters" }),
  last_name: z
    .string()
    .min(1, { message: "Last name is required" })
    .max(100, { message: "Last name cannot exceed 100 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z
    .string()
    .min(1, { message: "Phone is required" })
    .max(20, { message: "Phone number cannot exceed 20 characters" }),
  company: z
    .string()
    .max(255, { message: "Company name cannot exceed 255 characters" })
    .optional()
    .or(z.literal("").transform(() => undefined)),
  address: z
    .string()
    .max(255, { message: "Address cannot exceed 255 characters" })
    .optional()
    .or(z.literal("").transform(() => undefined)),
  source: z.string().optional(),
  interested_in: z.string().optional(),
  status: z.string().optional(),
  description: z
    .string()
    .optional()
    .or(z.literal("").transform(() => undefined)),
});

export type LeadSchema = z.infer<typeof leadSchema>;
