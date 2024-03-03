import { ClassMiddleware, Controller, Get, Middleware, Post, Put } from "@overnightjs/core";
import { NextFunction, Request, Response } from "express";
import { HandleAuthentication} from "./../../middleware/auth.middleware";
import * as userEvents from './user.service'


@Controller('api/user')
@ClassMiddleware([HandleAuthentication])
export class UserController {

    @Get('')
    async getUserData(req: any, res: Response, next: NextFunction) {
        const userData = userEvents.getUserData(req.userId)
        res.send(userData)
    }

    
    @Post('previous-scans')
    async previousScans(req: Request, res: Response) {
        const scans = await userEvents.pastScans(req.body)
        res.json(scans)
    }
}