import { databaseExecute } from "../database/database.js";

export const obtainStatSVC = async (userId) => {

    const querry = "SELECT videogames.videogameId, videogames.name, videogames.price, videogames.photo, videogames.purchases, videogames.views, videogames.wishlists FROM videogames WHERE userId = ?"

    const results = await databaseExecute(querry, [userId])

    if (!results) return false
    
    return results
}