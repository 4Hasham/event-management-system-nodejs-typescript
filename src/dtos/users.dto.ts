import Joi from 'joi';

export const createUserSchema = Joi.object({
    first_name: Joi.string().required().messages({
        "any.required": "Must provide first name."
    }),
    last_name: Joi.string().required().messages({
        "any.required": "Must provide last name."
    }),
    email: Joi.string().email().required().messages({
        "any.required": "Must provide valid email.",
        "string.email": "Must provide valid email."
    }),
    password: Joi.string().required().messages({
        "any.required": "Must provide password."
    }),
    otp: Joi.number().required().messages({
        "any.required": "Invalid OTP."
    })
});