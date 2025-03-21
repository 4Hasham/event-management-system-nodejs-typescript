import Event from "../models/Event";

export default class EventService {
    static async getAllEventsService(skip: number, limit: number) {
        try {
            return await Event.find({}, undefined, { sort: { event_date: -1 }, skip, limit }).exec();
        } catch (error) {
            console.error(new Date(), error);
            throw error;
        }
    }

    static async getEventById(id: string) {
        try {
            return await Event.findById(id).exec();
        } catch (error) {
            console.error(new Date(), error);
            throw error;            
        }
    }

    static async createEvent(event: object) {
        try {
            return await Event.create(event);
        } catch (error) {
            console.error(new Date(), error);
            throw error;
        }
    }

    static async updateEventById(id: string, event: object) {
        try {
            return await Event.findByIdAndUpdate(id, {
                $set: event
            }, {
                new: true,
                runValidators: true
            });
        } catch (error) {
            console.error(new Date(), error);
            throw error;
        }
    }
};
