import { databaseExecute } from "../database/database.js";

export const modifyProfileSVC = async (userId, name, surname, email, password, description, file) => {

    const fields = [];
    const values = [];

    if (name) {
        fields.push('name = ?');
        values.push(name);
    }
    if (surname) {
        fields.push('surname = ?');
        values.push(surname);
    }
    if (email) {
        fields.push('email = ?');
        values.push(email);
    }
    if (description) { 
        fields.push('description = ?');
        values.push(description);
    }
    if (password) {
        fields.push('password = ?');
        values.push(password);
    }
    if (file) {
        fields.push('pfp = ?');
        values.push(file);
    }

    values.push(userId);

    const query = `UPDATE users SET ${fields.join(', ')} WHERE userId = ?`;

    const results = await databaseExecute(query, values)

    if (!results) return 500;
    
    return true;
}

export const obtainOldFileSVC = async (userId) => {

    const query = "SELECT pfp FROM users WHERE userId = ?"
    const results = await databaseExecute(query, [userId])

    if (!results) return 500;

    return results[0].pfp
}