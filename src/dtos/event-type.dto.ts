import { z } from "zod";

export const createEventTypeSchema = z.object({
  title: z.string("Title is required").min(1).max(200).nonoptional(),
 
  description: z.string().min(1).max(1000).optional(),
  slug: z
    .string()
    .min(1)
    .max(100)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      message:
        "Slug must contain only lowercase letters, numbers, and single hyphens, and cannot start or end with a hyphen",
    }).optional(),
  durationMinutes: z
    .number("Duration is required")
    .min(15)
    .max(120)
    .default(30),
  locationType: z.enum(["online", "in-person"]).default("online"),
  locationValue: z.string().optional(),
  bufferBeforeMinutes: z.number().min(0).max(120).default(0),
  bufferAfterMinutes: z.number().min(0).max(120).default(0),
});

export const updateEventTypeSchema = createEventTypeSchema.partial();

// Create TypeScript types from the Zod schemas
export type CreateEventTypeDto = z.infer<typeof createEventTypeSchema>;
export type UpdateEventTypeDto = z.infer<typeof updateEventTypeSchema>;
