import { databaseExecute } from '../database/database.js'
import { v4 } from "uuid"

export const insertReviewSVC = async (videogameId, userId, description, stars) => {

    const reviewId = v4()
    
    const insertReview = "INSERT INTO reviews (reviewId, videogameId, userId, description, stars) VALUES (?, ?, ?, ?, ?)"
    const results = await databaseExecute(insertReview, [reviewId, videogameId, userId, description, stars])

    const getAverageRating = `SELECT AVG(stars) as averageRating FROM reviews WHERE videogameId = ?`;
    const newAverageRating  = await databaseExecute(getAverageRating, [videogameId]);
    
    const updateVideogameRating = `UPDATE videogames SET qualification = ? WHERE videogameId = ?`;
    const updateVideogame = await databaseExecute(updateVideogameRating, [newAverageRating[0].averageRating, videogameId]);
    
    if (!results || !newAverageRating || !updateVideogame) { return false }

    return true;
}

export const obtainReviewsSVC = async (videogameId) => {

    const getReviews = `SELECT reviews.stars, reviews.description, users.name
    FROM reviews 
    JOIN users ON reviews.userId = users.userId
    WHERE videogameId = ?`

    const results = await databaseExecute(getReviews, [videogameId])

    if (!results) return false

    return results;
}