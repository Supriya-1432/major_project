import mongoose from "mongoose"
import { USER_INTERFACE, User } from "../../models/user.model"


export const getUserData = async (userId : string) => {
    return User.findOne({ _id : new mongoose.Types.ObjectId(userId) })
}

export const pastScans = async (userId : string) => {
    const attachments = await User.findOne( { _id : userId }).populate('attachments').lean()
    return attachments.attachments
}

