// Import necessary modules and validation schemas
import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";

export const validateDummyData = (schema:ObjectSchema
  ) => (req:Request, res:Response, next: NextFunction) => {
  const { error } = schema.validate({...req.body, ...req.params});
  // If validation fails, return a 400 Bad Request response with the validation error details
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  // Move to the next middleware or route handler
  next();
}
