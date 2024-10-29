import { databaseExecute } from "../database/database.js";

export const obtainStatSVC = async (userId, page, limit) => {

    let querryArray = [userId]

    let querry = "SELECT videogames.videogameId, videogames.name, videogames.price, videogames.photo, videogames.purchases, videogames.views, videogames.wishlists FROM videogames WHERE userId = ?"

    querry += `LIMIT ? OFFSET ?;`
    querryArray.push(Number(limit), (page - 1) * limit)

    const results = await databaseExecute(querry, querryArray)

    if (!results) return false
    
    return results
}

export const obtainStatsCountSVC = async (userId) => {
    
        const querry = "SELECT COUNT(*) as statsCount FROM videogames WHERE userId = ?"
    
        const results = await databaseExecute(querry, [userId])
    
        if (!results) return false
    
        return results[0].statsCount
}