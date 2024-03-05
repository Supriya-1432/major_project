import { Controller, Get, Middleware, Post } from "@overnightjs/core";
import express, { NextFunction, Response } from "express";
import { initializeMulter } from "../../utilities/multer";
import { login, signUp, uploadScan } from "./public.service";
import path from "path";

@Controller('api/public')
export class PublicController {

    // According to model the result of the function changes
    @Post('uploadScan')
    @Middleware([initializeMulter()]) 
    async uploadScan(req: any, res: Response) {
        const fileData : any = req.files as Express.Multer.File[] 
        const result = await uploadScan(fileData,req?.headers?.userid);
        if(result) {
            res.json('Uploaded Successfully');
        }
        else {
            res.json('not uploaded')
        }
    }
    //model implementation

    @Post('register')
    async registerUser(req: Request | any, res: Response) {
        const data : any = await signUp(req.body)
        if (!data?.error) {
            res.json('Registered Successfully')
        }else{
            res.status(data?.code).json( data?.error )
        }
    }

    @Post('login')
    async verification(req: any, res: Response) {
        const jwtToken = await login(req.body)
        if(jwtToken?.token){
            res.json(jwtToken)
        }
        else{
            res.status(jwtToken?.code).json( jwtToken?.error )
        }
    }
}
