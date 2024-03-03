import { Controller, Get, Middleware, Post } from "@overnightjs/core";
import { Response } from "express";
import { initializeMulter } from "../../utilities/multer";
import { login, signUp, uploadScan } from "./public.service";

@Controller('api/public')
export class PublicController {

    // According to model the result of the function changes
    @Post('uploadScan')
    @Middleware([initializeMulter()]) 
    async uploadScan(req: any, res: Response) {
        const fileData : any = req.files as Express.Multer.File[] 
        const result = await uploadScan(fileData,req?.user?._id);
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
        const otp = await signUp(req.body)
        if (otp) {
            res.json('Registered Successfully')
        }
    }

    @Post('login')
    async verification(req: any, res: Response) {
        const jwtToken = await login(req.body)
        res.json(jwtToken)
    }
}
