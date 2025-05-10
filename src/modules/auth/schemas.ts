import { z } from "zod";

export const registerSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters long")
    .max(63, "Username must be at most 16 characters long")
    .regex(
      /^[a-z0-9][a-z0-9-]*[a-z0-9]$/,
      "Username can only be alphanumeric with hyphens. It must start and end with an alphanumeric character"
    )
    .refine(
      (val) => !val.includes("--"),
      "Username cannot contain consecutive hyphens"
    )
    .refine(
      (val) => !val.startsWith("-") && !val.endsWith("-"),
      "Username cannot start or end with a hyphen"
    )
    .transform((val) => val.toLowerCase()),
  email: z.string().email(),
  password: z.string().min(6),
});


export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
