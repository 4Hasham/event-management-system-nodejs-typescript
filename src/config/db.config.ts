import dotenv from 'dotenv';
dotenv.config({
    path: `.env.${process.env.NODE_ENV}`
});

export default {
    DATABASE: process.env.DATABASE
};