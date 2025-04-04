// Import Joi for validation
import Joi from "joi";

// Validation schema for creating dummy data
export const dummySchemaPost = Joi.object({
  // Validate name: must be a string with a minimum length of 2 characters, and it is required
  name: Joi.string().min(2).required(),
  // Validate email: must be a valid email format and is required
  email: Joi.string().email().required(),
  //Validate password: must be a valid password format and is required
  password: Joi.string().min(8).required(),
  role: Joi.string(),
  // Validate description: must be a string with a minimum length of 1 character
  description: Joi.string().min(1),
});
