import { databaseExecute } from "../database/database.js"
import { v4 } from "uuid"

export const registerVideogamesSVC = async (name, description, photo, filters, minRequirements, recRequirements, price, userId) => {

    const videogameId = v4()

    const insertVideogame = "INSERT INTO videogames (videogameId, userId, name, description, photo, minRequirements, recRequirements, price, views, purchases, wishlists, qualification) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
    const resultsInsert = await databaseExecute(insertVideogame, [videogameId, userId, name, description, photo, minRequirements, recRequirements, price, 0, 0, 0, 0])

    const insertCategory = "INSERT INTO filterCategory (videogameId, Aventura, Acción, RPG, MOBA) VALUES (?, ?, ?, ?, ?)"
    const resultsCategory = await databaseExecute(insertCategory, [videogameId, filters.includes("Aventura") ? 1 : 0, filters.includes("Acción") ? 1 : 0, filters.includes("RPG") ? 1 : 0, filters.includes("MOBA") ? 1 : 0])

    const insertOperatingSystem = "INSERT INTO filterOperatingSystem (videogameId, Windows, MacOS, Linux) VALUES (?, ?, ?, ?)"
    const resultsOperatingSystem = await databaseExecute(insertOperatingSystem, [videogameId, filters.includes("Windows") ? 1 : 0, filters.includes("MacOS") ? 1 : 0, filters.includes("Linux") ? 1 : 0])

    const insertLanguage = "INSERT INTO filterLanguage (videogameId, Español, Ingles, Chino, Portugues, Japones) VALUES (?, ?, ?, ?, ?, ?)"
    const resultsLanguage = await databaseExecute(insertLanguage, [videogameId, filters.includes("Español") ? 1 : 0, filters.includes("Ingles") ? 1 : 0, filters.includes("Chino") ? 1 : 0, filters.includes("Portugues") ? 1 : 0, filters.includes("Japones") ? 1 : 0])

    const insertPlayers = "INSERT INTO filterPlayers (videogameId, SinglePlayer, MultiPlayer) VALUES (?, ?, ?)"
    const resultsPlayers = await databaseExecute(insertPlayers, [videogameId, filters.includes("Single-Player") ? 1 : 0, filters.includes("Multi-Player") ? 1 : 0])

    return true;
}

export const obtainVideogamesSVC = async (filtersArray = [], qualification, page, limit) => {
    
    let querry = `
        SELECT 
            videogames.videogameId, videogames.name, videogames.price, videogames.photo
        FROM 
            videogames 
        JOIN
            users
        ON
            videogames.userId = users.userId
        JOIN 
            filterCategory
        ON 
            videogames.videogameId = filterCategory.videogameId 
        JOIN 
            filterLanguage
        ON 
            videogames.videogameId = filterLanguage.videogameId
        JOIN 
            filterOperatingSystem
        ON 
            videogames.videogameId = filterOperatingSystem.videogameId
        JOIN 
            filterPlayers
        ON 
            videogames.videogameId = filterPlayers.videogameId
        WHERE 1=1 `

    filtersArray.forEach((filter) => {
        querry += `AND ${filter} = 1 `;
    }
    );

    if (qualification) {
        querry += `AND qualification = ${qualification} `;
    }

    querry += `LIMIT ${limit} OFFSET ${(page - 1) * limit};`

    const videogames = await databaseExecute(querry)
    
    if (!videogames) return false

    return videogames;
}

//videogames.*, videogames.name vg_name, users.name, users.pfp, users.description, filterCategory.*, filterLanguage.*, filterOperatingSystem.*, filterPlayers.*

export const obtainVideogamesDetailSVC = async (videogameId) => {
        
    const querry = `
        SELECT 
            videogames.videogameId, videogames.name vg_name, videogames.price, videogames.photo, videogames.description vg_description, videogames.minRequirements, videogames.recRequirements, users.name, users.pfp, users.description
        FROM 
            videogames 
        JOIN
            users
        ON
            videogames.userId = users.userId
        JOIN 
            filterCategory
        ON 
            videogames.videogameId = filterCategory.videogameId 
        JOIN 
            filterLanguage
        ON 
            videogames.videogameId = filterLanguage.videogameId
        JOIN 
            filterOperatingSystem
        ON 
            videogames.videogameId = filterOperatingSystem.videogameId
        JOIN 
            filterPlayers
        ON 
            videogames.videogameId = filterPlayers.videogameId
        WHERE 
            videogames.videogameId = ?;`

    const videogame = await databaseExecute(querry, [videogameId])
    
    if (!videogame) return false

    return videogame;
}