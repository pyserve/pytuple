import { z } from "zod";

export const callSchema = z.object({
  lead: z.string({ required_error: "Lead ID is required" }),

  call_type: z.enum(["incoming", "outgoing"], {
    required_error: "Call type is required",
  }),

  status: z
    .enum(["scheduled", "completed", "missed", "failed", "no_answer"])
    .default("scheduled")
    .optional(),

  scheduled_time: z.string().optional(),

  notes: z.string().max(5000).optional(),
});

export type CallSchema = z.infer<typeof callSchema>;
