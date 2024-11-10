import { databaseExecute } from '../database/database.js';
import { v4 } from 'uuid';

export const registerVideogamesSVC = async (
  name,
  description,
  photo,
  filters,
  minRequirements,
  recRequirements,
  price,
  userId
) => {
  const videogameId = v4();

  const insertVideogame =
    'INSERT INTO videogames (videogameId, userId, name, description, photo, minRequirements, recRequirements, price, views, purchases, wishlists, qualification) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  const resultsInsert = await databaseExecute(insertVideogame, [
    videogameId,
    userId,
    name,
    description,
    photo,
    minRequirements,
    recRequirements,
    price,
    0,
    0,
    0,
    0,
  ]);

  const insertCategory =
    'INSERT INTO filterCategory (videogameId, Aventura, Acción, RPG, MOBA) VALUES (?, ?, ?, ?, ?)';
  const resultsCategory = await databaseExecute(insertCategory, [
    videogameId,
    filters.includes('Aventura') ? 1 : 0,
    filters.includes('Acción') ? 1 : 0,
    filters.includes('RPG') ? 1 : 0,
    filters.includes('MOBA') ? 1 : 0,
  ]);

  const insertOperatingSystem =
    'INSERT INTO filterOperatingSystem (videogameId, Windows, MacOS, Linux) VALUES (?, ?, ?, ?)';
  const resultsOperatingSystem = await databaseExecute(insertOperatingSystem, [
    videogameId,
    filters.includes('Windows') ? 1 : 0,
    filters.includes('MacOS') ? 1 : 0,
    filters.includes('Linux') ? 1 : 0,
  ]);

  const insertLanguage =
    'INSERT INTO filterLanguage (videogameId, Español, Ingles, Chino, Portugues, Japones) VALUES (?, ?, ?, ?, ?, ?)';
  const resultsLanguage = await databaseExecute(insertLanguage, [
    videogameId,
    filters.includes('Español') ? 1 : 0,
    filters.includes('Ingles') ? 1 : 0,
    filters.includes('Chino') ? 1 : 0,
    filters.includes('Portugues') ? 1 : 0,
    filters.includes('Japones') ? 1 : 0,
  ]);

  const insertPlayers = 'INSERT INTO filterPlayers (videogameId, SinglePlayer, MultiPlayer) VALUES (?, ?, ?)';
  const resultsPlayers = await databaseExecute(insertPlayers, [
    videogameId,
    filters.includes('Single-Player') ? 1 : 0,
    filters.includes('Multi-Player') ? 1 : 0,
  ]);

  if (!resultsInsert || !resultsCategory || !resultsOperatingSystem || !resultsLanguage || !resultsPlayers)
    return 500;

  return true;
};

export const obtainVideogamesSVC = async (
  filtersArray = [],
  qualification,
  page,
  limit,
  minPrice,
  maxPrice,
  search
) => {
  let querryArray = [];

  let querry = `
        SELECT
            videogames.videogameId, videogames.name vg_name, videogames.price, videogames.photo
        FROM 
            videogames 
        JOIN
            users
        ON
            videogames.userId = users.userId
        JOIN 
            filterCategory
        ON 
            videogames.videogameId = filterCategory.videogameId 
        JOIN 
            filterLanguage
        ON 
            videogames.videogameId = filterLanguage.videogameId
        JOIN 
            filterOperatingSystem
        ON 
            videogames.videogameId = filterOperatingSystem.videogameId
        JOIN 
            filterPlayers
        ON 
            videogames.videogameId = filterPlayers.videogameId
        WHERE visible=1 `;

  filtersArray.forEach(filter => {
    querry += `AND ${filter} = 1 `;
  });

  if (qualification) {
    querry += `AND qualification = ?`;
    querryArray.push(qualification);
  }

  querry += `AND price >= ? `;
  querryArray.push(Number(minPrice));

  if (maxPrice !== Infinity) {
    querry += `AND price <= ? `;
    querryArray.push(Number(maxPrice));
  }

  if (search) {
    querry += `AND videogames.name LIKE ? `;
    querryArray.push(`%${search}%`);
  }

  querry += `LIMIT ? OFFSET ?;`;
  querryArray.push(Number(limit), (page - 1) * limit);

  const videogames = await databaseExecute(querry, querryArray);

  if (!videogames) return 500;

  return videogames;
};

export const obtainVideogamesDetailSVC = async videogameId => {
  const querry = `
        SELECT
            videogames.videogameId, videogames.name vg_name, videogames.price, videogames.photo, videogames.description vg_description, videogames.minRequirements, videogames.recRequirements, users.name, users.pfp, users.description
        FROM 
            videogames 
        JOIN
            users
        ON
            videogames.userId = users.userId
        JOIN 
            filterCategory
        ON 
            videogames.videogameId = filterCategory.videogameId 
        JOIN 
            filterLanguage
        ON 
            videogames.videogameId = filterLanguage.videogameId
        JOIN 
            filterOperatingSystem
        ON 
            videogames.videogameId = filterOperatingSystem.videogameId
        JOIN 
            filterPlayers
        ON 
            videogames.videogameId = filterPlayers.videogameId
        WHERE 
            videogames.videogameId = ?;`;

  const addView = `UPDATE videogames SET views = views + 1 WHERE videogameId = ?`;

  const videogame = await databaseExecute(querry, [videogameId]);
  const view = await databaseExecute(addView, [videogameId]);

  if (!videogame || !view) return 500;

  return videogame[0];
};

export const obtainVideogamesCountSVC = async (
  filtersArray = [],
  qualification,
  minPrice,
  maxPrice,
  search
) => {
  let querryArray = [];

  let querry = `
        SELECT
            COUNT(videogames.videogameId) as videogamesCount
        FROM 
            videogames
        JOIN
            users
        ON
            videogames.userId = users.userId
        JOIN 
            filterCategory
        ON 
            videogames.videogameId = filterCategory.videogameId 
        JOIN 
            filterLanguage
        ON 
            videogames.videogameId = filterLanguage.videogameId
        JOIN 
            filterOperatingSystem
        ON 
            videogames.videogameId = filterOperatingSystem.videogameId
        JOIN 
            filterPlayers
        ON 
            videogames.videogameId = filterPlayers.videogameId
        WHERE visible=1 `;

  filtersArray.forEach(filter => {
    querry += `AND ${filter} = 1 `;
  });

  if (qualification) {
    querry += `AND qualification = ?`;
    querryArray.push(qualification);
  }

  querry += `AND price >= ? `;
  querryArray.push(Number(minPrice));

  if (maxPrice !== Infinity) {
    querry += `AND price <= ? `;
    querryArray.push(Number(maxPrice));
  }

  if (search) {
    querry += `AND videogames.name LIKE ? `;
    querryArray.push(`%${search}%`);
  }

  const videogamesCount = await databaseExecute(querry, querryArray);

  if (!videogamesCount) return 500;

  return videogamesCount;
};

export const obtainVideogamesUploadsSVC = async (userId, page, limit) => {
  let querryArray = [userId];

  let querry = `
            SELECT 
                videogames.videogameId, videogames.name, videogames.price, videogames.photo
            FROM 
                videogames
            JOIN
                users
            ON
                videogames.userId = users.userId
            JOIN 
                filterCategory
            ON 
                videogames.videogameId = filterCategory.videogameId 
            JOIN 
                filterLanguage
            ON 
                videogames.videogameId = filterLanguage.videogameId
            JOIN 
                filterOperatingSystem
            ON 
                videogames.videogameId = filterOperatingSystem.videogameId
            JOIN 
                filterPlayers
            ON 
                videogames.videogameId = filterPlayers.videogameId
            WHERE 
                videogames.userId = ?`;

  querry += `LIMIT ? OFFSET ?;`;

  querryArray.push(Number(limit), (page - 1) * limit);

  const videogames = await databaseExecute(querry, querryArray);

  if (!videogames) return false;

  return videogames;
};

export const obtainVideogamesUploadsCountSVC = async userId => {
  const querry = `
        SELECT 
            COUNT(videogames.videogameId) as videogamesCount
        FROM 
            videogames
        JOIN
            users
        ON
            videogames.userId = users.userId
        JOIN 
            filterCategory
        ON 
            videogames.videogameId = filterCategory.videogameId 
        JOIN 
            filterLanguage
        ON 
            videogames.videogameId = filterLanguage.videogameId
        JOIN 
            filterOperatingSystem
        ON 
            videogames.videogameId = filterOperatingSystem.videogameId
        JOIN 
            filterPlayers
        ON 
            videogames.videogameId = filterPlayers.videogameId
        WHERE 
            videogames.userId = ?;`;

  const videogamesCount = await databaseExecute(querry, [userId]);

  if (!videogamesCount) return false;

  return videogamesCount[0].videogamesCount;
};

export const obtainVideogameUploadsDetailsSVC = async videogameId => {
  const querry = `
            SELECT 
                videogames.videogameId, videogames.name, videogames.price, videogames.photo, videogames.description, videogames.minRequirements, videogames.recRequirements, videogames.visible
            FROM 
                videogames 
            JOIN 
                filterCategory
            ON 
                videogames.videogameId = filterCategory.videogameId 
            JOIN 
                filterLanguage
            ON 
                videogames.videogameId = filterLanguage.videogameId
            JOIN 
                filterOperatingSystem
            ON 
                videogames.videogameId = filterOperatingSystem.videogameId
            JOIN 
                filterPlayers
            ON 
                videogames.videogameId = filterPlayers.videogameId
            WHERE 
                videogames.videogameId = ?;`;

  const videogame = await databaseExecute(querry, [videogameId]);

  const querryFilters = `
            SELECT 
                filterCategory.Aventura, filterCategory.Acción, filterCategory.RPG, filterCategory.MOBA, filterLanguage.Español, filterLanguage.Ingles, filterLanguage.Chino, filterLanguage.Portugues, filterLanguage.Japones, filterOperatingSystem.Windows, filterOperatingSystem.MacOS, filterOperatingSystem.Linux, filterPlayers.SinglePlayer, filterPlayers.MultiPlayer
            FROM 
                videogames 
            JOIN 
                filterCategory
            ON 
                videogames.videogameId = filterCategory.videogameId 
            JOIN 
                filterLanguage
            ON 
                videogames.videogameId = filterLanguage.videogameId
            JOIN 
                filterOperatingSystem
            ON 
                videogames.videogameId = filterOperatingSystem.videogameId
            JOIN 
                filterPlayers
            ON 
                videogames.videogameId = filterPlayers.videogameId
            WHERE 
                videogames.videogameId = ?;`;

  const videogameFilters = await databaseExecute(querryFilters, [videogameId]);

  const filters = videogameFilters[0];

  let activeFilters = Object.keys(filters).filter(key => filters[key] === 1);

  activeFilters = activeFilters.map(key => {
    if (key === 'SinglePlayer') return 'Single-Player';
    if (key === 'MultiPlayer') return 'Multi-Player';
    return key;
  });

  if (!videogame || !videogameFilters) return 500;

  const info = {
    videogame: videogame[0],
    filters: activeFilters,
  };

  return info;
};

export const editVideogameUploadSVC = async (
  videogameId,
  name,
  description,
  photo,
  filters,
  minRequirements,
  recRequirements,
  price,
  visible
) => {
  const updateVideogame =
    'UPDATE videogames SET name = ?, description = ?, photo = ?, minRequirements = ?, recRequirements = ?, price = ?, visible = ? WHERE videogameId = ?';
  const resultsUpdate = await databaseExecute(updateVideogame, [
    name,
    description,
    photo,
    minRequirements,
    recRequirements,
    price,
    visible,
    videogameId,
  ]);

  const updateCategory =
    'UPDATE filterCategory SET Aventura = ?, Acción = ?, RPG = ?, MOBA = ? WHERE videogameId = ?';
  const resultsCategory = await databaseExecute(updateCategory, [
    filters.includes('Aventura') ? 1 : 0,
    filters.includes('Acción') ? 1 : 0,
    filters.includes('RPG') ? 1 : 0,
    filters.includes('MOBA') ? 1 : 0,
    videogameId,
  ]);

  const updateOperatingSystem =
    'UPDATE filterOperatingSystem SET Windows = ?, MacOS = ?, Linux = ? WHERE videogameId = ?';
  const resultsOperatingSystem = await databaseExecute(updateOperatingSystem, [
    filters.includes('Windows') ? 1 : 0,
    filters.includes('MacOS') ? 1 : 0,
    filters.includes('Linux') ? 1 : 0,
    videogameId,
  ]);

  const updateLanguage =
    'UPDATE filterLanguage SET Español = ?, Ingles = ?, Chino = ?, Portugues = ?, Japones = ? WHERE videogameId = ?';
  const resultsLanguage = await databaseExecute(updateLanguage, [
    filters.includes('Español') ? 1 : 0,
    filters.includes('Ingles') ? 1 : 0,
    filters.includes('Chino') ? 1 : 0,
    filters.includes('Portugues') ? 1 : 0,
    filters.includes('Japones') ? 1 : 0,
    videogameId,
  ]);

  const updatePlayers = 'UPDATE filterPlayers SET SinglePlayer = ?, MultiPlayer = ? WHERE videogameId = ?';
  const resultsPlayers = await databaseExecute(updatePlayers, [
    filters.includes('Single-Player') ? 1 : 0,
    filters.includes('Multi-Player') ? 1 : 0,
    videogameId,
  ]);

  if (!resultsUpdate || !resultsCategory || !resultsOperatingSystem || !resultsLanguage || !resultsPlayers)
    return 500;

  return true;
};

export const deleteVideogameSVC = async videogameId => {
  const deleteVideogame = 'DELETE aFROM videogames WHERE videogameId = ?';
  const resultsDelete = await databaseExecute(deleteVideogame, [videogameId]);

  console.log(resultsDelete);

  if (!resultsDelete) return 500;

  return true;
};
