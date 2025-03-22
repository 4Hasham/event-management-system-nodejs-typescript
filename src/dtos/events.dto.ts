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
    participants: Joi.array().optional(),
    event_date: Joi.date().required().messages({
        "any.required": "Must provide event date."
    })
});

export const updateEventByIdSchema = Joi.object({
    name: Joi.string().optional(),
    description: Joi.string().optional(),
    location: Joi.string().optional(),
    organizer: Joi.string().hex().length(24).optional(),
    participants: Joi.array().optional(),
    event_date: Joi.date().optional()
});

export const joinEventSchema = Joi.object({
    id: Joi.string().hex().length(24).required().messages({
        "any.required": "Must provide event organizer.",
        "string.hex": "Must provide valid event organizer ID.",
        "string.length": "Must provide valid organizer ID."
    }),
    participant: Joi.string().hex().length(24).required().messages({
        "any.required": "Must provide event participant ID.",
        "string.hex": "Must provide valid event participant ID.",
        "string.length": "Must provide valid participant ID."
    })
});