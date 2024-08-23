import { databaseExecute } from "../database/database.js";

export const registerClientSVC = async (bodyParams, userId, hashPassword) => {

    const role = "client"

    const registerClient = "INSERT INTO users (userId, name, surname, email, date, password, role) VALUES (?, ?, ?, ?, ?, ?, ?)"

    const results = await databaseExecute(registerClient, [userId, bodyParams.name, bodyParams.surname, bodyParams.email, bodyParams.date, hashPassword, role])

}

export const registerBusinessSVC = async (bodyParams, userId) => {

    const role = "business"

    //HACER
    
}