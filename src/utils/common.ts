import nodemailer from "nodemailer";
import config from "../config/env.config";
import jwt from "jsonwebtoken";

export const getError = (error: any): String => {
    try {
        if (error) {
            if (error.details)
                return error.details[0].message;
            else
                return error.message;
        }
        return "Unexpected error occurred.";          
    } catch (error) {
        console.error(new Date(), error.message)
        return null;
    }
}

export const sendMail = (email: string, subject: string, text: string, topic: string = '', html: string) => {
    return new Promise((resolve) => {
        let transporter = nodemailer.createTransport({
            host: config.EMAIL_SENDER_SERVICE,
            port: 465,
            secure: true,
            auth: {
                user: config.EMAIL_SENDER_USER,
                pass: config.EMAIL_SENDER_PASSWORD
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        let mailOptions = {
            from: config.EMAIL_SENDER_USER,
            to: email,
            subject: subject,
            text: text,
            html: html
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
            console.log(error)
                return resolve({ success: false, record: error });
            } else {
                return resolve({
                    success: true,
                    message: topic + " mail sent.",
                });
            }
        });
    });
}

export const generateToken = (obj: object, secret: string) => jwt.sign(obj, secret, { expiresIn: config.MAX_AGE });