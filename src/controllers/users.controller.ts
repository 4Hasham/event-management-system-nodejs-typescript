import { Request, Response } from "express";
import { APIResponse, CODES } from "../utils/response";
import UserService from "../services/users.service";
import { getError } from "../utils/common";
import { isValidObjectId } from "mongoose";
import { createUserSchema } from "../dtos/users.dto";

export default class UsersController {
    static async getActiveUsers(_: Request, res: Response): Promise<void> {
        try {
            const users = await UserService.getAllUsersService();
            let response: APIResponse = {
                success: true,
                message: "Fetched all active users!",
                record: users
            }
            res.status(CODES.OK).json(response);
        } catch (error) {
            console.error(new Date(), error);
            let response: APIResponse = {
                success: false,
                message:  getError(error) || "Could not fetch users.",
                record: {}
            }
            res.status(CODES.BAD_REQUEST).json(response);
        }
    }

    static async getUserById(req: Request, res: Response): Promise<void> {
        try {
            const id: string = req.params.id;
            if (!isValidObjectId(id))
                throw new Error("No valid user ID specified.");
            const user = UserService.getUserById(id);
            let response: APIResponse = {
                success: true,
                message: "Fetched user!",
                record: user
            };
            res.status(CODES.OK).json(response);
        } catch (error) {
            console.error(new Date(), error);
            let response: APIResponse = {
                success: false,
                message: getError(error) || "Could not fetch user.",
                record: null
            };
            res.status(CODES.BAD_REQUEST).json(response);
        }
    }

    static async createUser(req: Request, res: Response): Promise<void> {
        try {
            const payload: Object = req.body;
            const validate = createUserSchema.validate(payload);
            if (validate.error)
                throw validate.error;
            const value = validate.value;
            const user = await UserService.createUser(value);
            let response: APIResponse = {
                success: true,
                message: "Registered user!",
                record: {
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email
                }
            };
            res.status(CODES.CREATED).json(response);
        } catch (error) {
            console.error(new Date(), error);
            let response: APIResponse = {
                success: false,
                message: getError(error) || "Could not create user.",
                record: {}
            };
            res.status(CODES.BAD_REQUEST).json(response);
        }
    }
}