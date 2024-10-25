import { databaseExecute } from "../database/database.js";

export const wishlistAddSVC = async (videogameId, userId) => {

    const querry = "INSERT INTO wishlist (videogameId, userId) VALUES (?, ?)"

    const updateWishlistVideogames = "UPDATE videogames SET wishlists = wishlists + 1 WHERE videogameId = ?"

    const response = await databaseExecute(querry, [videogameId, userId])
    const response2 = await databaseExecute(updateWishlistVideogames, [videogameId])

    if (!response || !response2) return 500

    return true;

}

export const wishlistDeleteSVC = async (videogameId, userId) => {
    
    const querry = "DELETE FROM wishlist WHERE videogameId = ? AND userId = ?"

    const updateWishlistVideogames = "UPDATE videogames SET wishlists = wishlists - 1 WHERE videogameId = ?"
    
    const response = await databaseExecute(querry, [videogameId, userId])
    const response2 = await databaseExecute(updateWishlistVideogames, [videogameId])
    
    if (!response || !response2) return 500
    
    return true;
}

export const wishlistVerifySVC = async (videogameId, userId) => {
    
    const querry = "SELECT * FROM wishlist WHERE videogameId = ? AND userId = ?"
    const response = await databaseExecute(querry, [videogameId, userId])

    if (!response) return 500
    if (response.length == 0) return 204
    
    return true;
}

export const wishlistObtainSVC = async (userId, page, limit) => {
            
    let querryArray = [userId]
    
    let querry = `
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

    querry += `LIMIT ? OFFSET ?;`
    querryArray.push(Number(limit), (page - 1) * limit)
    
    const response = await databaseExecute(querry, querryArray)
            
    if (!response) return 500
    if (response.length == 0) return 204
            
    return response;
}

export const wishlistObtainCountSVC = async (userId) => {
            
    const querry = `
    SELECT 
        COUNT(wishlist.videogameId) as wishlistCount
    FROM
        wishlist
    WHERE 
        wishlist.userId = ?`

    const response = await databaseExecute(querry, [userId])
            
    if (!response) return 500
    if (response.length == 0) return 204
            
    return response;
}