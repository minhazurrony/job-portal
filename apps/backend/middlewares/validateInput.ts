import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

export const validateInput =
  (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction): void => {
    try {
      schema.parse(req.body); // Validate the request body
      next(); // Proceed to the next middleware if validation succeeds
    } catch (err) {
      res.status(400).json({
        error: "Invalid input",
        details: (err as any).errors, // Zod provides detailed error messages
      });
    }
  };
