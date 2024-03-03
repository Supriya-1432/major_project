import { USER_INTERFACE, User } from "../../models/user.model"
import { HTTPError } from "../../middleware/error-handling.middleware"
import { JWT_EXPIRY, JWT_SECRET } from "../../config"


export const getUserData = async (userId : string) => {
    return User.findOne({ _id : userId })
}

export const pastScans = async (userId : string) => {
    const attachments = (await User.findOne( { _id : userId },{ attachments : 1, _id : 0})).populate('attachments')
    return attachments
}

