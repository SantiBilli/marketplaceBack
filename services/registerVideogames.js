import { databaseExecute } from "../database/database.js"
import { v4 } from "uuid"

export const registerVideogamesSCV = async (name, description, photo, category, operating_system, language, players, minRequirements, recRequirements, price, userId) => {

    const videogameId = v4()

    const insertVideogame = "INSERT INTO videogames (videogameId, name, description, photo, minRequirements, recRequirements, price, userId) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"

    const results = await databaseExecute(insertVideogame, [videogameId, name, description, photo, minRequirements, recRequirements, price, userId])

    return true;
}

export const obtainVideogamesSCV = async (category, operating_system, language, players, qualification, page, limit) => {

    return true;
}