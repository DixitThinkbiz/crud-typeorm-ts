import Joi from "joi";

export const dummySchemaPost = Joi.object({
  name:Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  description:Joi.string().min(1)
});

