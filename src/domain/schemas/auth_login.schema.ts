// Import Joi for validation
import Joi from "joi";

// Validation schema for creating dummy data
export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  //Validate password: must be a valid password format and is required
  password: Joi.string().min(8).required(),
});
