import { Schema } from 'mongoose';
import database from '../databases/database';

const Event = new Schema({
    name: {
        type: String,
        required: [true, "You must declare event's name."]
    },
    description: {
        type: String,
        required: [true, "Please provide a description for the event."]
    },
    event_date: {
        type: Date,
        default: new Date()
    },
    location: {
        type: String,
        required: [true, "Please specify the location of your event."]
    },
    organizer: {
        type: Schema.Types.ObjectId,
        required: [true, "Must provide organizer's ID."]
    }
});

export default database.model('events', Event);