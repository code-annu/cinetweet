import { NextFunction, Request, Response } from "express";
import { ZodError, ZodSchema } from "zod";

export const validateRequestBody =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = schema.parse(req.body);
      req.body = parsed;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          message: "Validation failed",
          errors: error.issues,
        });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  };
