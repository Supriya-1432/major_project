import { ClassMiddleware, Controller, Get, Middleware, Post, Put } from "@overnightjs/core";
import express, { NextFunction, Request, Response } from "express";
import { HandleAuthentication} from "./../../middleware/auth.middleware";
import * as userEvents from './user.service'
import { logger } from "../../utilities/logger";
import path from "path";


@Controller('api/user')
@ClassMiddleware([HandleAuthentication])
export class UserController {
    @Get('')
    async getUserData(req: any, res: Response) {
        const userData = await userEvents.getUserData(req.user._id)
        res.json(userData)
    }
    
    
    @Get('previous-scans')
    async previousScans(req: any, res: Response) {
        const scans = await userEvents.pastScans(req.user._id)
        res.json(scans)
    }
}
