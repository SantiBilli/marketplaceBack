import { databaseExecute } from "../database/database.js";

export const obtainStatSVC = async (userId) => {

    const querry = "SELECT videogames.name, videogames.price, videogames.photo, videogames.purchases, videogames.views, videogames.wishlists FROM videogames WHERE userId = ?"

    const results = await databaseExecute(querry, [userId])

    console.log(results);

    if (!results) return false
    
    return results
}