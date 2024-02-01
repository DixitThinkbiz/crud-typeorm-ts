// Import Joi for validation
import Joi from "joi";

// Validation schema for creating dummy data
export const idSchema = Joi.object({
  id: Joi.number()

});
