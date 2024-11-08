import { databaseExecute } from '../database/database.js';

export const addToLibrarySVC = async (videogameId, userId) => {
  const querry = `INSERT INTO library (videogameId, userId) VALUES (?, ?)`;

  const response = await databaseExecute(querry, [videogameId, userId]);

  if (!response) return true;

  return true;
};
