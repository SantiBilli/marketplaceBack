import { v4 } from "uuid"
import bcrypt from "bcrypt"
import { databaseExecute } from "../database/database.js";

export const emailExistsSVC = async (email) => {
    
    const emailExists = "SELECT userId FROM users WHERE email = ?"

    const results = await databaseExecute(emailExists, [email])

    if (results.length == 0) return false
    
    return true;
}

export const registerClientSVC = async (name, surname, email, date, password) => {

    const userId = v4()

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)

    const registerClient = "INSERT INTO users (userId, name, surname, email, date, password, role) VALUES (?, ?, ?, ?, ?, ?, ?)"

    const results = await databaseExecute(registerClient, [userId, name, surname, email, date, hashPassword, "client"])

    if (!results) return 500

}

export const registerBusinessSVC = async (name, email, date, pfp, description, password) => {

    const userId = v4()

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)

    const registerBusiness = "INSERT INTO users (userId, name, email, date, pfp, description, password, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
    
    const results = await databaseExecute(registerBusiness, [userId, name, email, date, pfp, description, hashPassword, "business"])

    if (!results) return 500
    
}