import Event from "../models/Event";
import User from "../models/User";
import { sendMail } from "../utils/common";
import emailTemplates from "../utils/emailTemplates";
import { ObjectId } from 'mongodb';

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

    static async notifyParticipants(event: any, participants: any[] = []) {
        try {
            if (event) {
                let filteredParticipants: any[] = event.participants.filter((p: any) => participants.includes(p));
                let users = await User.find({ _id: { $in: filteredParticipants } }, { email: 1 }).exec();
                let emails = users.filter(user => user._id.toString() !== event.organizer.toString()).map(user => user.email);
                const template = emailTemplates.Event(event);
                await sendMail(emails.join(', '), template.subject, template.text, "Invitation", template.html);
                return {
                    emails
                };
            }
            else
                throw new Error("No event information provided.");
        } catch (error) {
            throw error;
        }
    }

    static async joinEvent(id: string, participant: any) {
        try {
            let event = await Event.findByIdAndUpdate(id, {
                $push: {
                    participants: new ObjectId(participant)
                }
            }, { new: true });
            return this.notifyParticipants(event, participant);
        } catch (error) {
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

    static async deleteEvent(id: string) {
        try {
            return await Event.deleteOne({ _id: new ObjectId(id) }).exec();
        } catch (error) {
            console.error(new Date(), error);
            throw error;
        }
    }
};
