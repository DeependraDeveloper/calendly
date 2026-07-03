import { z } from "zod";

// Define a Zod schema for user creation and validation
export const createUserSchema = z.object({
  name: z
    .string()
    .min(3, "Name is required")
    .max(50, "Name must be less than 50 characters"),
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const updateUserSchema = z
  .object({
    name: z
      .string()
      .min(3, "Name must be at least 3 characters")
      .max(50, "Name must be less than 50 characters")
      .optional(),
    email: z.email("Invalid email address").optional(),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters long")
      .optional(),
  })
  .refine((data) => data.name !== undefined || data.email !== undefined, {
    message: "At least one of name or email must be provided",
  });

// Create a TypeScript type from the Zod schema
export type CreateUserDto = z.infer<typeof createUserSchema>;
export type UpdateUserDto = z.infer<typeof updateUserSchema>;
