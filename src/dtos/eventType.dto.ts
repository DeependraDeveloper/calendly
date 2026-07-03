import { z } from "zod";

export const createEventTypeSchema = z.object({
  hostId: z.number("Host Id is required").int(),
  title: z.string("Title is required").nonoptional(),
  name: z
    .string("Title is required")
    .min(3, "Title must be at least 3 characters")
    .max(50, "Title must be less than 50 characters"), // Fixed typo 'Tile' -> 'Title'
  description: z.string().optional(),
  durationMinutes: z.number("Duration is required").int(),
  locationType: z.string().optional(),
  locationValue: z.string().optional(),
  bufferBeforeMinutes: z.number().int().optional(),
  bufferAfterMinutes: z.number().int().optional(),
});

export const updateEventTypeSchema = z
  .object({
    name: z
      .string()
      .min(3, "Title must be at least 3 characters")
      .max(50, "Title must be less than 50 characters")
      .optional(),
    description: z.string().optional(),
    durationMinutes: z.number().int().optional(),
    locationType: z.string().optional(),
    locationValue: z.string().optional(),
    bufferBeforeMinutes: z.number().int().optional(),
    bufferAfterMinutes: z.number().int().optional(),
  })
  .refine((data) => Object.values(data).some((value) => value !== undefined), {
    message: "At least one parameter must be provided to update",
  });

// Create TypeScript types from the Zod schemas
export type CreateEventTypeDto = z.infer<typeof createEventTypeSchema>;
export type UpdateEventTypeDto = z.infer<typeof updateEventTypeSchema>;
