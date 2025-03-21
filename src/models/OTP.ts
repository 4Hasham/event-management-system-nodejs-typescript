import database from '../databases/database';
import { isEmail } from "validator";
import { Schema } from 'mongoose';

const OTPSchema = new Schema({
    otp: {
        type: String,
    },
    email: {
        type: String,
        required: [true, "E-mail address is required"],
        unique: true,
        validate: [isEmail, "E-mail address is not valid"]
    },
    createdOn: {
        type: Date,
        default: Date.now()
    }
});

export default database.model('otp', OTPSchema);