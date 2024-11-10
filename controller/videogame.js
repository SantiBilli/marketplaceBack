import {
  deleteVideogameSVC,
  editVideogameUploadSVC,
  obtainVideogamesCountSVC,
  obtainVideogamesDetailSVC,
  obtainVideogamesSVC,
  obtainVideogamesUploadsCountSVC,
  obtainVideogamesUploadsSVC,
  obtainVideogameUploadsDetailsSVC,
  registerVideogamesSVC,
} from '../services/videogame.js';
import fs from 'fs';

export const registerVideogamesCTL = async (req, res, next) => {
  const userData = res.locals.userData;
  const bodyParams = req.body;
  const file = req.file;
  const photo = file.filename;
  const filters = bodyParams.filters.split(',');

  if (userData.role == 'client') {
    fs.unlinkSync(`uploads/videogamePhotos/${photo}`);
    res.status(401);
    return next();
  }

  const publicaciones = await registerVideogamesSVC(
    bodyParams.name,
    bodyParams.description,
    photo,
    filters,
    bodyParams.minRequirements,
    bodyParams.recRequirements,
    bodyParams.price,
    userData.userId
  );

  if (publicaciones === 500) {
    fs.unlinkSync(`uploads/videogamePhotos/${photo}`);
    res.status(500);
    return next();
  }

  res.status(201);
  next();
};

export const obtainVideogamesCTL = async (req, res, next) => {
  let { filters, qualification, page, limit, minPrice, maxPrice, search } = req.query;

  if (!minPrice) {
    minPrice = 0;
  }
  if (!maxPrice) {
    maxPrice = Infinity;
  }

  let filtersArray;

  if (filters) {
    filtersArray = filters.split(',');

    if (filtersArray.includes('Single-Player')) {
      filtersArray[filtersArray.indexOf('Single-Player')] = 'SinglePlayer';
    }

    if (filtersArray.includes('Multi-Player')) {
      filtersArray[filtersArray.indexOf('Multi-Player')] = 'MultiPlayer';
    }
  }

  const videogames = await obtainVideogamesSVC(
    filtersArray,
    qualification,
    page,
    limit,
    minPrice,
    maxPrice,
    search
  );
  const count = await obtainVideogamesCountSVC(filtersArray, qualification, minPrice, maxPrice, search);

  if (videogames == 500 || count == 500) res.status(500).send();

  res.locals.response = {
    data: {
      videogames: videogames,
      count: count[0],
    },
  };

  next();
};

export const obtainVideogamesDetailCTL = async (req, res, next) => {
  const videogameId = req.params.videogameId;

  const userData = res.locals.userData;

  const videogame = await obtainVideogamesDetailSVC(videogameId);

  if (videogame == 500) {
    res.status(500);
    return next();
  }

  res.locals.response = { data: videogame };

  next();
};

export const obtainVideogamesUploadsCTL = async (req, res, next) => {
  const userData = res.locals.userData;

  const { page, limit } = req.query;

  const videogames = await obtainVideogamesUploadsSVC(userData.userId, page, limit);
  const count = await obtainVideogamesUploadsCountSVC(userData.userId);

  if (videogames == 500 || count == 500) {
    res.status(500);
    return next();
  }

  res.locals.response = {
    data: {
      videogames: videogames,
      count: count,
    },
  };

  next();
};

export const obtainVideogameUploadsDetailsCTL = async (req, res, next) => {
  const videogameId = req.params.videogameId;

  const videogame = await obtainVideogameUploadsDetailsSVC(videogameId);

  if (videogame == 500) {
    res.status(500);
    return next();
  }

  res.locals.response = { data: videogame };

  next();
};

export const editVideogameUploadCTL = async (req, res, next) => {
  const { id, name, description, minRequirements, recRequirements, price, filters, visible } = req.body;

  const file = req.file;

  const info = await obtainVideogameUploadsDetailsSVC(id);

  if (info === 500) {
    res.status(500);
    return next;
  }

  const photo = info.videogame.photo;

  const activeFilters = filters.split(',');

  if (file) {
    fs.unlinkSync(`uploads/videogamePhotos/${photo}`);
  }

  const videogameEdit = await editVideogameUploadSVC(
    id,
    name,
    description,
    file ? file.filename : photo,
    activeFilters,
    minRequirements,
    recRequirements,
    price,
    visible
  );

  if (videogameEdit === 500) {
    res.status(500);
    return next();
  }

  next();
};

export const deleteVideogameCTL = async (req, res, next) => {
  const videogameId = req.params.videogameId;

  const videogameDelete = await deleteVideogameSVC(videogameId);

  if (videogameDelete === 500) {
    res.status(500);
  }

  next();
};
