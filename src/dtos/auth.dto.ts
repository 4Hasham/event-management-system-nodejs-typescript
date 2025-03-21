import Joi from 'joi';

export const loginUserSchema = Joi.object({
    email: Joi.string().email().required().messages({
        "any.required": "Must provide email to login."
    }),
    password: Joi.string().required().messages({
        "any.required": "Must provide password to login."
    })
});

export const emailSchema = Joi.string().email().required().messages({
    "any.required": "Must provide a valid email address",
    "string.email": "Invalid email format."
});