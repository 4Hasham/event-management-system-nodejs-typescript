import './config'

export default {
    PORT: parseInt(process.env.APP_PORT),
    MAX_AGE: parseInt(process.env.MAX_AGE),
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
    DOMAIN: process.env.DOMAIN,
    EMAIL_SENDER_SERVICE: process.env.EMAIL_SENDER_SERVICE,
    EMAIL_SENDER_USER: process.env.EMAIL_SENDER_SERVICE,
    EMAIL_SENDER_PASSWORD: process.env.EMAIL_SENDER_PASSWORD
};