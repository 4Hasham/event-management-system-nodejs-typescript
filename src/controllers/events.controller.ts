import { Request, Response } from "express";
import { APIResponse, CODES } from "../utils/response";
import { getError } from "../utils/common";
import { createEventSchema, getAllEventsSchema, joinEventSchema, updateEventByIdSchema } from "../dtos/events.dto";
import EventService from '../services/events.service';
import { isValidObjectId } from "mongoose";

export default class EventController {
    static async getAllEvents(req: Request, res: Response): Promise<void> {
        try {
            const payload: Object = req.query;
            const validate = getAllEventsSchema.validate(payload);
            if (validate.error)
                throw validate.error;
            const value = validate.value;
            const events = await EventService.getAllEventsService(value.page, value.pageSize);
            let response: APIResponse = {
                success: true,
                message: "Fetched all events!",
                record: events
            }
            res.status(CODES.OK).json(response);
        } catch (error) {
            console.error(new Date(), error);
            let response: APIResponse = {
                success: false,
                message:  getError(error) || "Could not fetch events.",
                record: {}
            }
            res.status(CODES.BAD_REQUEST).json(response);
        }
    }

    static async getEventById(req: Request, res: Response): Promise<void> {
        try {
            const id: string = req.params.id;
            if (!isValidObjectId(id))
                throw new Error("No valid event ID specified.");
            const event = await EventService.getEventById(id);
            let response: APIResponse = {
                success: true,
                message: "Fetched event!",
                record: event
            };
            res.status(CODES.OK).json(response);
        } catch (error) {
            console.error(new Date(), error);
            let response: APIResponse = {
                success: false,
                message: getError(error) || "Could not fetch event.",
                record: null
            };
            res.status(CODES.BAD_REQUEST).json(response);
        }
    }

    static async createEvent(req: Request, res: Response): Promise<void> {
        try {
            const payload: Object = req.body;
            const validate = createEventSchema.validate(payload);
            if (validate.error)
                throw validate.error; 
            const value = validate.value;
            const event = await EventService.createEvent(value);
            let response: APIResponse = {
                success: true,
                message: "Created event!",
                record: event
            };
            res.status(CODES.CREATED).json(response);
        } catch (error) {
            console.error(new Date(), error);
            let response: APIResponse = {
                success: false,
                message: getError(error) || "Could not create event.",
                record: {}
            };
            res.status(CODES.BAD_REQUEST).json(response);
        }
    }

    static async updateEventById(req: Request, res: Response): Promise<void> {
        try {
            const payload: Object = req.body;
            const id = req.params.id;
            const validate = updateEventByIdSchema.validate(payload);
            if (validate.error)
                throw validate.error;
            if (!isValidObjectId(id))
                throw new Error("No valid event ID specified.");
            const value = validate.value;
            const event = await EventService.updateEventById(id, value);
            let response: APIResponse = {
                success: true,
                message: "Created event!",
                record: event
            };
            res.status(CODES.OK).json(response);
        } catch (error) {
            console.error(new Date(), error);
            let response: APIResponse = {
                success: false,
                message: getError(error) || "Could not update event.",
                record: {}
            };
            res.status(CODES.BAD_REQUEST).json(response);
        }
    }

    static async joinEvent(req: any, res: Response) {
        try {
            const id = req.params.id;
            if (!isValidObjectId(id))
                throw new Error("No valid event ID specified.");
            const event = await EventService.joinEvent(id, req.auth.id);
            let response: APIResponse = {
                success: true,
                message: "Event joined!",
                record: event
            };
            res.status(CODES.OK).json(response);
        } catch (error) {
            console.error(new Date(), error);
            let response: APIResponse = {
                success: false,
                message: getError(error) || "Could not join event.",
                record: {}
            };
            res.status(CODES.BAD_REQUEST).json(response);
        }
    }

    static async deleteEvent(req: Request, res: Response) {
        try {
            const id = req.params.id;
            if (!isValidObjectId(id))
                throw new Error("No valid event ID specified.");
            const event = await EventService.deleteEvent(id);
            let response: APIResponse = {
                success: true,
                message: "Event deleted!",
                record: event
            };
            res.status(CODES.OK).json(response);
        } catch (error) {
            console.error(new Date(), error);
            let response: APIResponse = {
                success: false,
                message: getError(error) || "Could not delete event.",
                record: {}
            };
            res.status(CODES.BAD_REQUEST).json(response);
        }
    }
}
