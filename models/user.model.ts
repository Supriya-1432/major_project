import { Model, Schema, model } from "mongoose";

export interface USER_INTERFACE extends Document {
    fullName : string,
    age : number,
    email : string,
    password : string,
    attachments : []
} 

const UserSchema: Schema = new Schema({
   fullName : { type : String ,trim: true},
   age: { type : Number },
   email : { type : String , unique : true} ,
   password : { type : String },
   attachments : [{ type: Schema.Types.ObjectId, ref: 'Attachment' }]
}, { timestamps: true });

export const User: Model<USER_INTERFACE> = model<USER_INTERFACE>('User', UserSchema);