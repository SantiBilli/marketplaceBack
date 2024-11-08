import { databaseExecute } from "../database/database.js";
import bcrypt from "bcrypt"

export const forgotPasswordSVC = async (email) => {

    const consulta = "SELECT userId FROM users WHERE email = ?"

    const results = await databaseExecute(consulta, [email])

    if (results.length == 0) {
        return false
    }
    
    return true;
    
}

export const userTokenSVC = async (email, token) => {

    const consulta = "UPDATE users SET reset_token = ? WHERE email = ?"
    const results = await databaseExecute(consulta, [token, email])

    if (!results) return 500

    return true
}


export const obtainTokenUserSVC = async (token) => {
    const consulta = "SELECT userId FROM users WHERE reset_token = ?"
    const results = await databaseExecute(consulta, [token])
    if (results.length == 0) {
        return false
    }

    return results[0].userId

}

export const updatePasswordSVC = async (userId, password) => {
    const consulta = "UPDATE users SET password = ?, reset_token = NULL WHERE userId = ?"

    const results = await databaseExecute(consulta, [password, userId])

    if (!results) return 500

    return true

}
