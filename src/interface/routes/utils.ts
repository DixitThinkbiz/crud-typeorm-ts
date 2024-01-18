// Import necessary modules and validation schemas
import Express from "express";
import { dummySchemaPost } from "../../domain/schemas/add_dummy.schema";
import { dummySchemaPatch } from "../../domain/schemas/update-dummy.schema";

// Middleware to validate request body for adding dummy data
export const validateDummyPost = (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
  // Validate the request body against the add dummy schema
  const { error } = dummySchemaPost.validate(req.body);

  // If validation fails, return a 400 Bad Request response with the validation error details
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  // Move to the next middleware or route handler
  next();
};

// Middleware to validate request body for updating dummy data
export const validateDummyPatch = (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
  // Validate the request body against the update dummy schema
  const { error } = dummySchemaPatch.validate(req.body);

  // If validation fails, return a 400 Bad Request response with the validation error details
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  // Move to the next middleware or route handler
  next();
};
