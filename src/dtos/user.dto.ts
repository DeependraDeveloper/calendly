import {z} from "zod";

// Define a Zod schema for user creation and validation
export const createUserSchema = z.object({
  name: z.string().min(3, "Name is required").max(50, "Name must be less than 50 characters"),
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

// Create a TypeScript type from the Zod schema
export type CreateUserDto = z.infer<typeof createUserSchema>;