import { databaseExecute } from '../database/database.js';

export const paymentVideogameDetailsSVC = async videogameId => {
  const querry = `SELECT videogameId, name vg_name, photo, price FROM videogames WHERE videogameId = ?`;

  const results = await databaseExecute(querry, [videogameId]);

  if (!results) return 500;

  return results[0];
};

export const addToLibrarySVC = async (videogameId, userId) => {
  const querry = `INSERT INTO library (videogameId, userId) VALUES (?, ?)`;
  const querryStats = 'UPDATE videogames SET purchases = purchases + 1 WHERE videogameId = ?';
  const deleteWishList = 'DELETE FROM wishlist WHERE videogameId = ? AND userId = ?';

  const response = await databaseExecute(querry, [videogameId, userId]);
  const response2 = await databaseExecute(querryStats, [videogameId]);
  const response3 = await databaseExecute(deleteWishList, [videogameId, userId]);

  if (!response || !response2 || !response3) return 500;

  return true;
};
