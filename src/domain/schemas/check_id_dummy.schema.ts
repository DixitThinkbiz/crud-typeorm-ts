// Import Joi for validation
import Joi from "joi";

// Validation schema for creating dummy data
export const checkIdDummySchema = Joi.object({
  // Validate id: must be a number and is required
  id: Joi.number().required()
});
