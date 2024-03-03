import Jwt,{ TokenExpiredError }  from 'jsonwebtoken';
import * as config from './../config';
import { NextFunction, Request, Response } from "express";
import { User } from "../models/user.model";
import { logger } from "../utilities/logger";
import { resError } from "./error-handling.middleware";

export function HandleAuthentication(req: any, res: Response, next: NextFunction) {
    const bearer = req.headers.authorization as string
    const token: string = bearer.replace('Bearer ', '')


    Jwt.verify(token, config.JWT_SECRET, async (err: any, decodedToken: any) => {
        if (err) {
            logger.error(err.message)
            if (err.name == TokenExpiredError) {
                return resError(res, 'Sesssion Expired', 401)
            }
            return resError(res, 'Unauthorized', 401)
        } else {
            const loggedInUser: any = await User.findOne({ _id: decodedToken._id });
            if (!loggedInUser.isActive)
                return resError(res, 'Unauthorized', 401)
            req.user = loggedInUser
            next()
        }
    })
}