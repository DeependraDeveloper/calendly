import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";
import { badRequest } from "../utilities/api-error.js";


// Validate is a middleware function that takes a Zod schema and validates the request body against it.
// It splits custom middleware logic into a separate function for better readability and maintainability.
export const validate =
  (schema: ZodSchema) => (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success)
      throw badRequest("Validation failed", result.error.issues);

    req.body = result.data; // Assign the validated data back to req.body
    next();
  };
