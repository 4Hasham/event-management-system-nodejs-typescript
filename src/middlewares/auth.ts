const jwt = require("jsonwebtoken");
import config from "../config/env.config";
import { CookieOptions, NextFunction, Request, Response } from 'express';
import { generateToken } from '../utils/common';
import { CODES } from '../utils/response';

const token = (req: Request) => {
    const refreshToken = req.cookies.jwt_refresh_token;
    if(!refreshToken)
        return {
            err: "No refresh token."
        };
    try {
        let { id, email, phone } = jwt.verify(refreshToken, config.REFRESH_TOKEN_SECRET);
        return generateToken({ id, email, phone }, config.ACCESS_TOKEN_SECRET);
    }
    catch(err) {
        return {
            err: "Refresh token expired."
        };
    }
}

// const optionalAuth = (req: any, _: Response, next: NextFunction) => {
//     const _token = req.cookies.jwt_access_token;
//     if(!_token)
//         console.log("Not authenticated");
//     try {
//         req.auth = jwt.verify(_token, config.ACCESS_TOKEN_SECRET);
//     } catch(e) {
//         console.log(e, "Error occurred while authenticating, continuing..");
//     }
//     next();
// }

const auth = async (req: any, res: Response, next: NextFunction): Promise<void> => {
    const _token = req.cookies.jwt_access_token;
    if(!_token) {
        res.status(CODES.UNAUTHORIZED).json({
            success: false,
            message: "Access denied.",
            record: null
        });
        return;
    }
    try {
        req.auth = jwt.verify(_token, config.ACCESS_TOKEN_SECRET);
        const expirationTimestamp = req.auth.exp * 1000;
        const currentTime = new Date().getTime();
        const expirationLimit = 5 * 60 * 1000;
        if (expirationTimestamp - currentTime < expirationLimit) {
            let newToken = token(req);
            if(typeof newToken !== 'object') {
                 let options: CookieOptions = {
                     httpOnly: true, maxAge: config.MAX_AGE * 1000, sameSite: "none", secure: true, domain: config.DOMAIN, path: '/'
                 };
                 res.cookie('jwt_access_token', newToken, options);
            }
        }
        next();
    }
    catch(err) {
        res.status(CODES.UNAUTHORIZED).json({
            success: false,
            message: "Access denied.",
            record: null
        });
    }
}

const verify = async(req: any, res: Response, next: NextFunction): Promise<void> => {
    if (req.auth.is_admin) {
        next();
    }
    res.status(CODES.FORBIDDEN).json({
        success: false,
        message: "You are not authorized to perform this action.",
        record: null
    });
}

export default {
    auth,
    verify
};