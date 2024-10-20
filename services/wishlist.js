import { databaseExecute } from "../database/database.js";

export const wishlistAddSVC = async (videogameId, userId) => {

    const querry = "INSERT INTO wishlist (videogameId, userId) VALUES (?, ?)"
    const response = await databaseExecute(querry, [videogameId, userId])

    if (!response) return 500

    return true;

}

export const wishlistDeleteSVC = async (videogameId, userId) => {
    
    const querry = "DELETE FROM wishlist WHERE videogameId = ? AND userId = ?"
    const response = await databaseExecute(querry, [videogameId, userId])
    
    if (!response) return 500
    
    return true;
}

export const wishlistVerifySVC = async (videogameId, userId) => {
    
    const querry = "SELECT * FROM wishlist WHERE videogameId = ? AND userId = ?"
    const response = await databaseExecute(querry, [videogameId, userId])

    if (!response) return 500
    if (response.length == 0) return 204
    
    return true;
}

export const wishlistObtainSVC = async (userId) => {
            
    const querry = `
    SELECT 
        wishlist.videogameId, videogames.photo, videogames.name, videogames.price
    FROM 
        wishlist
    JOIN
        videogames
    ON
        wishlist.videogameId = videogames.videogameId
    WHERE 
        wishlist.userId = ?`

    const response = await databaseExecute(querry, [userId])
            
    if (!response) return 500
    if (response.length == 0) return 204
            
    return response;
}