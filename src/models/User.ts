import { Schema } from 'mongoose';
import database from '../databases/database';
import { isStrongPassword, isEmail } from 'validator';
import bcrypt from 'bcrypt';

const User = new Schema({
    first_name: {
        type: String,
        required: [true, "You must provide your first name."]
    },
    last_name: {
        type: String,
        required: [true, "You must provide your last name."]
    },
    email: {
        type: String,
        required: [true, "E-mail address is required"],
        lowercase: true,
        unique: true,
        validate: [isEmail, "E-mail address is not valid"],
      },
    password: {
        type: String,
        required: [true, "Password is required"],
        validate: [
          isStrongPassword,
          "Password should at least 8 characters long and must contain at least one digit, special character and uppercase letter.",
        ],
    },
    created_date: {
        type: Date,
        default: new Date()
    },
    is_verified: {
        type: Boolean,
        default: false
    },
    is_admin: {
        type: Boolean,
        default: false
    }
});

User.pre("save", function (next) {
    let salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
    next();
});

export default database.model('users', User);