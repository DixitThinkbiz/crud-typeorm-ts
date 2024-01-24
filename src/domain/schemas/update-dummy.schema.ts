// Import Joi for validation
import Joi from "joi";

// Validation schema for updating dummy data
export const dummySchemaPatch = Joi.object({
    // Validate email: must be a valid email format
    email: Joi.string().email(),
    // Validate name: must be a string with a minimum length of 2 characters, and it is required
    name: Joi.string().min(2).required(),
    // Validate description: must be a string with a minimum length of 1 character
    description: Joi.string().min(1)
})
