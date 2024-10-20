import { modifyProfileSVC, obtainOldFileSVC } from "../services/profile.js";
import bcrypt from "bcrypt"
import fs from "fs"
import { emailExistsSVC } from "../services/register.js";

export const modifyProfileCTL = async (req, res, next) => {
    
    const { name, surname, email, password, description } = req.body;

    if (!name && !surname && !email && !password && !description) {
        return res.status(400).send("Faltan parámetros.")
    }

    const userId = res.locals.userData.userId

    if (email) {
        const emailExists = await emailExistsSVC(email)
    
        if (emailExists) {
            return res.status(409).send("Email ya registrado.")
        }
    }

    if (req.file) {
        const oldFile = await obtainOldFileSVC(userId)
        if (oldFile == 500) {
            res.status(500).send("Database Error.")
            return next()
        }
        fs.unlinkSync(`uploads/businessLogos/${oldFile}`);
    }
    
    let hashPassword = null;

    if (password) {
        const salt = await bcrypt.genSalt(10)
        hashPassword = await bcrypt.hash(password, salt)
    }

    const modifyProfile = await modifyProfileSVC(userId, name, surname, email, hashPassword, description, req.file ? req.file.filename : null);

    if (modifyProfile == 500) { res.status(500) }
    
    next()

}