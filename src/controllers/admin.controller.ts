import { CookieOptions, Request, Response } from "express";
import { emailSchema, loginUserSchema } from "../dtos/auth.dto";
import AdminService from '../services/admin.service';
import config from '../config/env.config';
import { APIResponse, CODES } from "../utils/response";
import { getError } from "../utils/common";
import { isValidObjectId } from "mongoose";

export default class AdminController {
    static async approveEvent(req: any, res: Response): Promise<void> {
        try {
            const id: string = req.params.id;
            if (!isValidObjectId(id))
                throw new Error("Invalid event ID provided.");
            let data = await AdminService.approveEvent(id);
            let response: APIResponse = {
                success: true,
                message: "Event approved!",
                record: data
            }
            res.status(CODES.OK).json(response);
        } catch (error) {
            console.error(new Date(), error);
            let response: APIResponse = {
                success: false,
                message: getError(error) || "We could not get auth status.",
                record: {}
            }
            res.status(CODES.UNAUTHORIZED).json(response);
        }
    }

    static async isAdmin(_: any, res: Response) {
        try {
            let response: APIResponse = {
                success: true,
                message: "User is admin.",
                record: {}
            }
            res.status(CODES.OK).json(response);
        } catch (error) {
            console.error(new Date(), error);
            let response: APIResponse = {
                success: false,
                message: getError(error) || "Not admin.",
                record: {}
            }
            res.status(CODES.FORBIDDEN).json(response);
        }
    }
}
