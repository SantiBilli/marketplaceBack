import { databaseExecute } from '../database/database.js';

export const verifyLibraryVideogameSVC = async (videogameId, userId) => {
  const querry = 'SELECT * FROM library WHERE videogameId = ? AND userId = ?';
  const response = await databaseExecute(querry, [videogameId, userId]);

  if (!response) return 500;
  if (response.length == 0) return 204;

  return true;
};

export const getLibrarySVC = async (userId, page, limit) => {
  let querryArray = [userId];

  let querry = `
    SELECT
        library.videogameId, videogames.photo, videogames.name, videogames.price
    FROM 
        library
    JOIN
        videogames
    ON
        library.videogameId = videogames.videogameId
    WHERE 
        library.userId = ?`;

  querry += `LIMIT ? OFFSET ?;`;
  querryArray.push(Number(limit), (page - 1) * limit);

  const response = await databaseExecute(querry, querryArray);

  if (!response) return 500;

  return response;
};

export const getLibraryCountSVC = async userId => {
  const querry = `
    SELECT 
        COUNT(library.videogameId) as libraryCount
    FROM
        library
    WHERE 
        library.userId = ?`;

  const response = await databaseExecute(querry, [userId]);

  if (!response) return 500;

  return response;
};
