import { Model, Schema, model } from "mongoose";

export interface ATTACHMENT_INTERFACE extends Document {
    fileName : string,
    path : string,
    result : string,
} 

const AttachmentSchema: Schema = new Schema({
   fileName : { type : String ,trim: true},
   filePath : { type : String } ,
   result : { type : String },
}, { timestamps: true });

export const Attachment: Model<ATTACHMENT_INTERFACE> = model<ATTACHMENT_INTERFACE>('Attachment', AttachmentSchema);