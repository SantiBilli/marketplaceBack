import { databaseExecute } from "../database/database.js";

export const modifyProfileSVC = async (userId, name, surname, email, date, password, description, file) => {

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
    if (date) {
        fields.push('date = ?');
        values.push(date);
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

export const obtainProfileSVC = async (userId, role) => {

    let query;
    
    role == 'client' ? query = "SELECT name, surname, email, pfp, date FROM users WHERE userId = ?" 
    : query = "SELECT name, email, description role FROM users WHERE userId = ?"
        
    const results = await databaseExecute(query, [userId])

    if (!results) return 500;

    return results[0];
    
}