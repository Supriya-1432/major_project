import { HTTPError } from "../../middleware/error-handling.middleware";
import { Attachment } from "../../models/attachment.model"
import { USER_INTERFACE, User } from "../../models/user.model";
const fs = require('fs');
import Jwt from 'jsonwebtoken';
import { JWT_EXPIRY, JWT_SECRET } from "../../config";
import { logger } from "../../utilities/logger";
import path from "path";
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
        fs.mkdirSync(uploadDir, { recursive: true }); 
        fs.writeFile(data.filePath +'/'+ data.fileName, file.buffer, async (err) => {
            if (err) {
                logger.error('Error occurred while writing file to filesystem', err);
            } else {
                try {
                    let attachment = await Attachment.create(data);
                    if (userId) {
                        await User.findOneAndUpdate({ _id: userId }, { $push: { attachments: attachment._id } });
                    }
                } catch (error) {
                    logger.error('Error occurred while creating attachment record', error);
                }
            }
        });
        return true;
    } catch (err) {
        logger.error('Error occurred while uploading image', err);
        return false;
    }
};

export const signUp = async ( data : USER_INTERFACE ) => {
    try{
        const user = await User.findOne({ email : data.email }).lean()
        if(!user._id){
            data.password = bcrypt.hashSync(data.password, 2)
            const createdUser = User.create(data)
            return createdUser
        }
        else{
            throw new HTTPError('User already exists with this email')
        }
    }catch(err){
        logger.error('Error Occured during signUp ',err)
    }
}

export const login = async ( data : { email : string, password : string} ) =>{
    try{
        const user = await User.findOne({ email : data.email }).lean()
        if(user._id){
            if(bcrypt.compareSync(data.password, user.password)) {
                return ({ token: getJwtToken(user), user: user });
            }
            else {
                throw new HTTPError('Please enter correct password')
            }
        }
        else{
            throw new HTTPError('No User exists with this email')
        }
    }catch(err){
        logger.error('Error Occured during logIn ',err)
    }
}