import { Request, Response } from "express";
import { APIResponse, CODES } from "../utils/response";

const getAllUsers = (req: Request, res: Response) => {
    let response: APIResponse;
    try {
        
    } catch (error) {
        console.error(new Date(), error);
        response.success = false;
        response.message = error.message || "Could not fetch events.";
        response.record = {};
        res.status(CODES.BAD_REQUEST).json(response);
    }
}

export default {
    getAllUsers
};