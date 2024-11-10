import { databaseExecute } from '../database/database.js';
import { v4 } from 'uuid';

export const insertReviewSVC = async (videogameId, userId, description, stars) => {
  const reviewId = v4();
  const current_time = new Date();

  const insertReview =
    'INSERT INTO reviews (reviewId, videogameId, userId, description, stars, insert_time) VALUES (?, ?, ?, ?, ?, ?)';
  const results = await databaseExecute(insertReview, [
    reviewId,
    videogameId,
    userId,
    description,
    stars,
    current_time,
  ]);

  const getAverageRating = `SELECT AVG(stars) as averageRating FROM reviews WHERE videogameId = ?`;
  const newAverageRating = await databaseExecute(getAverageRating, [videogameId]);

  const updateVideogameRating = `UPDATE videogames SET qualification = ? WHERE videogameId = ?`;
  const updateVideogame = await databaseExecute(updateVideogameRating, [
    newAverageRating[0].averageRating,
    videogameId,
  ]);

  if (!results || !newAverageRating || !updateVideogame) {
    return 500;
  }

  return true;
};

export const obtainReviewsSVC = async (videogameId, page, limit) => {
  let querryArray = [videogameId];

  let getReviews = `SELECT reviews.stars, reviews.description, users.name
    FROM reviews
    JOIN users ON reviews.userId = users.userId
    WHERE videogameId = ? ORDER BY reviews.insert_time DESC `;

  getReviews += `LIMIT ? OFFSET ?;`;
  querryArray.push(Number(limit), (page - 1) * limit);

  const results = await databaseExecute(getReviews, querryArray);

  if (!results) return 500;

  return results;
};

export const reviewsCountSVC = async videogameId => {
  const getReviewsCount = `SELECT COUNT(*) as reviewsCount FROM reviews WHERE videogameId = ?`;

  const results = await databaseExecute(getReviewsCount, [videogameId]);

  if (!results) return 500;

  return results[0].reviewsCount;
};
