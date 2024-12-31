import { z } from "zod";

export const signUpSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.string().email("Invalid email format"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must include an uppercase letter")
    .regex(/\d/, "Password must include a number"),
});

export const signInSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must include an uppercase letter")
    .regex(/\d/, "Password must include a number"),
});

export const jobSchema = z.object({
  company: z.string().min(2, "At least 2 characters long"),
  designation: z.string().min(2, "At least 2 characters long"),
  type: z.string().min(2, "At least 2 characters long"),
  location: z.string().min(2, "At least 2 characters long"),
  shift: z.string().min(2, "At least 2 characters long"),
  overview: z.string().min(2, "At least 2 characters long"),
  responsibilities: z.string().min(2, "At least 2 characters long"),
  requirements: z.string().min(2, "At least 2 characters long"),
  qualifications: z.string().min(2, "At least 2 characters long"),
  office_location: z.string().min(2, "At least 2 characters long"),
  salary: z.string().min(2, "At least 2 characters long"),
  category_id: z.number().min(1),
});
