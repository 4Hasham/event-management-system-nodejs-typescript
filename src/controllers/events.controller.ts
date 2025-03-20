import { Request, Response } from "express";
import { APIResponse, CODES } from "../utils/response";
import Event from "../models/Event";
import { getError } from "../utils/common";
import { getAllEventsSchema, getEventsByIdSchema } from "../dtos/events.dtos";

export default class EventController {
    static getAllEvents(req: Request, res: Response): void {
        let response: APIResponse;
        try {
            const payload: Object = req.query;
            const validate = getAllEventsSchema.validate(payload);
            if (validate.error)
                throw validate.error;
            const value = validate.value;
            const events = Event.find({}, undefined, { sort: { event_date: -1 }, skip: value.page, limit: value.pageSize });
            response.success = true;
            response.message = "Fetched all events!";
            response.record = events;
            res.status(CODES.OK).json(response);
        } catch (error) {
            console.error(new Date(), error);
            response.success = false;
            response.message = getError(error) || "Could not fetch events.";
            response.record = {};
            res.status(CODES.BAD_REQUEST).json(response);
        }
    }

    static getEventById(req: Request, res: Response): void {
        let response: APIResponse;
        try {
            const payload: Object = req.params.id;
            const validate = getEventsByIdSchema.validate(payload);
            if (validate.error)
                throw validate.error;
            const value = validate.value;
            const events = Event.find({}, undefined, { sort: { event_date: -1 }, skip: value.page, limit: value.pageSize });
            response.success = true;
            response.message = "Fetched all events!";
            response.record = events;
            res.status(CODES.OK).json(response);
        } catch (error) {
            console.error(new Date(), error);
            response.success = false;
            response.message = getError(error) || "Could not fetch event.";
            response.record = {};
            res.status(CODES.BAD_REQUEST).json(response);
        }
    }

    static createEvent(req: Request, res: Response): void {
        let response: APIResponse;
        try {
            
            res.status(CODES.CREATED).json(response);
        } catch (error) {
            console.error(new Date(), error);
            response.success = false;
            response.message = getError(error) || "Could not create event.";
            response.record = {};
            res.status(CODES.BAD_REQUEST).json(response);
        }
    }

    static updateEventById(req: Request, res: Response): void {
        let response: APIResponse;
        try {
            
            res.status(CODES.OK).json(response);
        } catch (error) {
            console.error(new Date(), error);
            response.success = false;
            response.message = getError(error) || "Could not update event.";
            response.record = {};
            res.status(CODES.BAD_REQUEST).json(response);
        }
    }
}
