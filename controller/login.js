import bcrypt from "bcrypt"
import { obtainPassword } from "../services/login.js"

export const loginCTL = async (req, res) => {
    
    const bodyParams = req.body

    const userData = await obtainPassword(bodyParams.email)

    if (userData == 500) return res.status(500).send("Database Error.")

    if (!userData) return res.status(401).send("Invalid Credentials") //401 Unauthorized

    const match = await bcrypt.compare(bodyParams.password, userData.password)

    if (!match) return res.status(401).send("Invalid Credentials") //401 Unauthorized

    res.status(200).send()
}