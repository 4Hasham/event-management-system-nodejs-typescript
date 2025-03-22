import { CookieOptions, Request, Response } from "express";
import { emailSchema, loginUserSchema } from "../dtos/auth.dto";
import AuthService from '../services/auth.service';
import config from '../config/env.config';
import { APIResponse, CODES } from "../utils/response";
import { generateToken, getError } from "../utils/common";

export default class AuthController {
    static async isUserAuthenticated(req: any, res: Response): Promise<void> {
        try {
            if (req.auth) {
                let response: APIResponse = {
                    success: true,
                    message: "User is logged in!",
                    record: req.auth
                }
                res.status(CODES.OK).json(response);
            }
            throw new Error('No user logged in.');
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

    static async loginUser(req: Request, res: Response): Promise<void> {
        try {
            const payload: Object = req.body;
            const validate = loginUserSchema.validate(payload);
            if (validate.error)
                throw validate.error;
            const value = validate.value;

            let obj = await AuthService.loginUser({ email: value.email, password: value.password });
            let accessToken = generateToken({ id: obj._id, email: obj.email, is_admin: obj.is_admin }, config.ACCESS_TOKEN_SECRET);
            let refreshToken = generateToken({ id: obj._id, email: obj.email }, config.REFRESH_TOKEN_SECRET);
        
            let options: CookieOptions = { httpOnly: true, maxAge: config.MAX_AGE * 1000, sameSite: "none", domain: config.DOMAIN, secure: true };
        
            res.cookie("jwt_access_token", accessToken, options);
            options.maxAge = options.maxAge * 10;
            res.cookie("jwt_refresh_token", refreshToken, options);
            let response: APIResponse = {
                success: true,
                message: "Logged in.",
                record: obj
            }
            res.status(CODES.OK).json(response);
        } catch (error) {
            console.error(new Date(), error);
            let response: APIResponse = {
                success: false,
                message: getError(error) || "We could not log you in.",
                record: {}
            }
            res.status(CODES.UNAUTHORIZED).json(response);
        }
    };
    
    static async logoutUser(_: Request, res: Response): Promise<void> {
        try {
            let options: CookieOptions = { httpOnly: true, maxAge: 0, sameSite: "none", domain: config.DOMAIN, secure: true };
            res.cookie("jwt_access_token", "", options);
            res.cookie("jwt_refresh_token", "", options);
            const response: APIResponse = {
                success: true,
                message: "Logged out.",
                record: null
            };
            res.status(CODES.OK).json(response);
        } catch (error) {
            console.error(new Date(), error);
            let response: APIResponse = {
                success: false,
                message: getError(error) || "We could not log you out.",
                record: {}
            }
            res.status(CODES.BAD_REQUEST).json(response);
        }
    }

    static async sendActivationOTP(req: Request, res: Response) {
        try {
            const email: string = req.body.email;
            const validate = emailSchema.validate(email);
            if (validate.error)
                throw validate.error;
            const value = validate.value;
            let response = await AuthService.sendOTP(value);
            res.status(CODES.OK).json(response);
        } catch (error) {
            console.error(new Date(), error);
            let response: APIResponse = {
                success: false,
                message: getError(error) || "Could not send activation OTP.",
                record: {}
            }
            res.status(CODES.BAD_REQUEST).json(response);
        }
    }
}
