import { v4 } from "uuid"
import bcrypt from "bcrypt"
import { registerClientSVC } from "../services/register.js"

export const registerClientCTL = async (req, res) => {
    
    const bodyParams = req.body

    const userId = v4()

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(bodyParams.password, salt)

    const registerClient =  await registerClientSVC(bodyParams, userId, hashPassword)

    res.status(200).send()
}