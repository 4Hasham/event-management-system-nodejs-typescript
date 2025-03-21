import Joi from 'joi';

export const getAllEventsSchema = Joi.object({
    page: Joi.number().required().messages({
        "any.required": "Must provide page to display."
    }),
    pageSize: Joi.number().required().messages({
        "any.required": "Must provide events limit."
    })
});

export const createEventSchema = Joi.object({
    name: Joi.string().required().messages({
        "any.required": "Must provide event name."
    }),
    description: Joi.string().required().messages({
        "any.required": "Must provide event description."
    }),
    location: Joi.string().required().messages({
        "any.required": "Must provide event location."
    }),
    organizer: Joi.string().hex().length(24).required().messages({
        "any.required": "Must provide event organizer.",
        "string.hex": "Must provide valid event organizer ID.",
        "string.length": "Must provide valid organizer ID."
    }),
    event_date: Joi.date().required().messages({
        "any.required": "Must provide event date."
    })
});

export const updateEventByIdSchema = Joi.object({
    name: Joi.string().optional(),
    description: Joi.string().optional(),
    location: Joi.string().optional(),
    organizer: Joi.string().hex().length(24).optional(),
    event_date: Joi.date().optional()
});