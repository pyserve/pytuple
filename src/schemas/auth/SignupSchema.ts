import { z } from "zod";

export const signupSchema = z
  .object({
    email: z.string().email("Email is required"),
    password: z.string().min(1, "Password is required"),
    confirm_password: z.string().min(1, "Confirm password is required"),
    first_name: z.string().optional(),
    last_name: z.string().optional(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords don't match",
    path: ["confirm_password"],
  });

export type SignupSchema = z.infer<typeof signupSchema>;
