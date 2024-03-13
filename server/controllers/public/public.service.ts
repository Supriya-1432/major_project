import { HTTPError } from "../../middleware/error-handling.middleware";
import { Attachment } from "../../models/attachment.model"
import { USER_INTERFACE, User } from "../../models/user.model";
const fs = require('fs');
import Jwt from 'jsonwebtoken';
import { JWT_EXPIRY, JWT_SECRET } from "../../config";
import { logger } from "../../utilities/logger";
import path from "path";
import mongoose from "mongoose";
const bcrypt = require('bcrypt');

const getJwtToken = (payload: any) => {
    return Jwt.sign({ ...payload }, JWT_SECRET, {
        expiresIn: JWT_EXPIRY
    })
}

export const uploadScan = async (files: Express.Multer.File[], userId: string) => {
    try {
        if (!files || !files.length) {
            throw new Error('No files were uploaded');
        }

        const file = files[0]; // Assuming only one file is uploaded

        if (!file.buffer) {
            throw new Error('File buffer is missing');
        }

        let attachments = await Attachment.find();
       
        const uploadDir = path.join(__dirname,'..','..','..','images');
        const data = {
            fileName: 'IMAGE_' + attachments.length + '.jpeg',
            filePath: uploadDir,
            result: 'Pending'
        };
        await fs.mkdirSync(uploadDir, { recursive: true }); 
        await fs.promises.writeFile(data.filePath +'/'+ data.fileName, file.buffer, async (err: any) => {
            if (err) {
                logger.error('Error occurred while writing file to filesystem', err);
            }
        });
        let attachment : any
        try {
            attachment = await Attachment.create(data);
            if (userId) {
                await User.findOneAndUpdate({ _id: userId }, { $push: { attachments: attachment._id } });
            }
        } catch (error) {
            logger.error('Error occurred while creating attachment record', error);
        }
        return attachment._id;
    } catch (err) {
        logger.error('Error occurred while uploading image', err);
        return false;
    }
};

export const resultData = async (attachmentId: string) => {
    try {
        const lastRecord = await Attachment.findOne({ _id: new mongoose.Types.ObjectId(attachmentId) }).lean();
        if (lastRecord) {
            const result = lastRecord.result;
            return result;
        } else {
            console.error('No records found');
            return null;
        }
    } catch (error) {
        console.error('Error fetching user result:', error);
        return null;
    }
};

export const signUp = async ( data : USER_INTERFACE ) => {
    try{
        const user = await User.findOne({ email : data.email }).lean()
        if(!user){
            data.password = bcrypt.hashSync(data.password, 2)
            const createdUser = await User.create(data)
            return createdUser
        }
        else{
            throw new HTTPError('User already exists with this email')
        }
    }catch(err){
        logger.error('Error Occured during signUp ',err)
        return {error : 'User already exists with this email',code : 400}
    }
}

export const login = async ( data : { email : string, password : string} ) =>{
    let code = 200
    try{
        const user = await User.findOne({ email : data.email }).lean()
        if(user){
            if(bcrypt.compareSync(data.password, user.password)) {
                return ({ token: getJwtToken(user), user: user });
            }
            else {
                code = 401
                throw new HTTPError('Please enter correct password')
            }
        }
        else{
            code = 404
            throw new HTTPError('No User exists with this email')
        }
    }catch(err){
        logger.error('Error Occured during logIn ',err)
        return({ error : err ,code : code})
    }
}

export const getGraphData = async () => {
    return Attachment.aggregate([
        {
            $match:
            {
                result: {
                    $ne: "Pending",
                },
            },
        },
        {
            $group: {
                _id: {
                    result: "$result",
                    month: {
                        $month: "$createdAt",
                    },
                    year: {
                        $year: "$createdAt",
                    },
                },
                count: {
                    $count: {},
                },
            },
        },
        {
            $project:
            {
                _id: 0,
                result: "$_id.result",
                count: "$count",
                month: "$_id.month",
                year: "$_id.year",
            },
        },
    ])
}