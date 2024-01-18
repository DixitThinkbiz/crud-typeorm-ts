// Import Joi for validation
import Joi from "joi";

// Validation schema for updating dummy data
export const dummySchemaPatch = Joi.object({
    // Validate id: must be a number and is required
    id: Joi.number().required(),
    // Validate email: must be a valid email format
    email: Joi.string().email(),
    // Validate description: must be a string with a minimum length of 1 character
    description: Joi.string().min(1)
})
