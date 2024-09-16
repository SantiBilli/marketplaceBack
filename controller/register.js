import { emailExistsSVC, registerBusinessSVC, registerClientSVC } from "../services/register.js"
import fs from "fs"
import bcrypt from "bcrypt"
export const registerClientCTL = async (req, res) => {
    
    const bodyParams = req.body

    if (!bodyParams.name || !bodyParams.surname || !bodyParams.email || !bodyParams.date || !bodyParams.password) return res.status(400).send("Faltan Parametros.")

    const emailExists = await emailExistsSVC(bodyParams.email)
    
    if (emailExists) {
        return res.status(409).send("Email ya registrado.")
    }

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(bodyParams.password, salt)

    const registerClient =  await registerClientSVC(bodyParams.name, bodyParams.surname, bodyParams.email, bodyParams.date, hashPassword)

    if (!registerClientSVC == 500) return res.status(500).send("Database Error.")

    return res.status(201).send("Usuario registrado exitosamente.")
}


export const registerBusinessCTL = async (req, res) => {

    const bodyParams = req.body
    
    if (!req.file || !bodyParams.name || !bodyParams.email || !bodyParams.description || !bodyParams.password) return res.status(400).send("Faltan Parametros.")
    
    const file = req.file
    const logo = file.filename


    const emailExists = await emailExistsSVC(bodyParams.email)

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(bodyParams.password, salt)
    
    if (emailExists) {
        fs.unlinkSync(`uploads/businessLogos/${logo}`);
        return res.status(409).send("Email ya registrado.")
    }

    const registerBusiness =  await registerBusinessSVC(bodyParams.name, bodyParams.email, logo, bodyParams.description, hashPassword)

    if (registerBusiness == 500) return res.status(500).send("Database Error.")
        

    return res.status(201).send("Empresa registrada exitosamente.")
}