import { modifyProfileSVC, obtainOldFileSVC, obtainProfileSVC } from "../services/profile.js";
import bcrypt from "bcrypt"
import fs from "fs"
import { emailExistsSVC } from "../services/register.js";

export const modifyProfileCTL = async (req, res, next) => {
    
    const { name, surname, email, date, password, description } = req.body;

    if (!name && !surname && !email && !date && !password && !description && !req.file) {
        return res.status(400).send("Faltan parámetros.")
    }

    const userId = res.locals.userData.userId

    if (email) {
        const emailExists = await emailExistsSVC(email)
    
        if (emailExists) {
            res.status(409)
            return next()
        }
    }

    if (req.file) {
        
        const oldFile = await obtainOldFileSVC(userId)
        
        if (oldFile == 500) {
            res.status(500)
            return next()
        }
        if (oldFile != null){
            fs.unlinkSync(`uploads/profilePhotos/${oldFile}`)
        }
    }
    
    let hashPassword = null;

    if (password) {
        const salt = await bcrypt.genSalt(10)
        hashPassword = await bcrypt.hash(password, salt)
    }

    const modifyProfile = await modifyProfileSVC(userId, name, surname, email, date, hashPassword, description, req.file ? req.file.filename : null);

    if (modifyProfile == 500) { res.status(500) }

    next()

}

export const getProfilesCTL = async (req, res, next) => {
    
    const userData = res.locals.userData
    const userId = userData.userId
    const userRole = userData.role

    const profile = await obtainProfileSVC(userId, userRole)

    res.locals.response = { data: profile }

    next()
}