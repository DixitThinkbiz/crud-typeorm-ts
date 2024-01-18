import Joi from "joi";

export const dummySchemaPatch = Joi.object({
    id:Joi.number().required(),
    email: Joi.string().email(),
    phoneNo: Joi.string().length(10),
    password: Joi.string().min(6),
    description: Joi.string().min(1)
}).options({ allowUnknown: true });

