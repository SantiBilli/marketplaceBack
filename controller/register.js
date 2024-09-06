import { emailExistsSVC, registerBusinessSVC, registerClientSVC } from "../services/register.js"
import fs from "fs"
export const registerClientCTL = async (req, res) => {
    
    const bodyParams = req.body

    const emailExists = await emailExistsSVC(bodyParams.email)
    
    if (emailExists) {
        return res.status(409).send("Email already exists.")
    }

    const registerClient =  await registerClientSVC(bodyParams.name, bodyParams.surname, bodyParams.email, bodyParams.date, bodyParams.password)

    if (!registerClientSVC == 500) return res.status(500).send("Database Error.")

    return res.status(201).send("Created.")
}


export const registerBusinessCTL = async (req, res) => {
    
    const bodyParams = req.body
    const file = req.file
    const logo = file.filename

    const emailExists = await emailExistsSVC(bodyParams.email)
    
    if (emailExists) {
        fs.unlinkSync(`uploads/${logo}`);
        return res.status(409).send("Email already exists.")
    }

    
    const registerBusiness =  await registerBusinessSVC(bodyParams.name, bodyParams.email, logo, bodyParams.description, bodyParams.password)

    if (!registerBusinessSVC == 500) return res.status(500).send("Database Error.")

    return res.status(201).send("Created.")
}