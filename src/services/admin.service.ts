import Event from "../models/Event";
import EventService from "./events.service";

export default class AdminService {
    static async approveEvent(id: string) {
      try {
        let updatedEvent = await Event.findByIdAndUpdate(id, {
            $set: {
                approved: true
            }
        }, { new: true }).exec();
        return EventService.notifyParticipants(updatedEvent, updatedEvent.participants)
      } catch (error) {
        console.error(new Date(), error);
        throw error;
      }
    };
};