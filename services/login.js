import { databaseExecute } from "../database/database.js";

export const obtainPassword = async (email) => {
    
    const userData = "SELECT userId, password FROM users WHERE email = ?"

    const results = await databaseExecute(userData, [email])

    if (results.length == 0) {
        return false
    }

    return results[0];
}