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

  if (!publicaciones) res.status(500);

  res.status(201);

  next();
};

export const obtainVideogamesCTL = async (req, res, next) => {
  let { filters, qualification, page, limit, minPrice, maxPrice, search } = req.query;

  if (minPrice == 'null' || minPrice == 'undefined' || minPrice == '') {
    minPrice = 0;
  }
  if (maxPrice == 'null' || maxPrice == 'undefined' || maxPrice == '') {
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

  if (!videogames) res.status(500);

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

  const videogame = await obtainVideogamesDetailSVC(videogameId);

  res.locals.response = { data: videogame };

  next();
};

export const obtainVideogamesUploadsCTL = async (req, res, next) => {
  const userData = res.locals.userData;

  const { page, limit } = req.query;

  const videogames = await obtainVideogamesUploadsSVC(userData.userId, page, limit);
  const count = await obtainVideogamesUploadsCountSVC(userData.userId);

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

  res.locals.response = { data: videogame };

  next();
};

export const editVideogameUploadCTL = async (req, res, next) => {
  const { id, name, description, minRequirements, recRequirements, price, filters, visible } = req.body;

  const file = req.file;

  const info = await obtainVideogameUploadsDetailsSVC(id);
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

  if (!videogameEdit) res.status(500);

  next();
};

export const deleteVideogameCTL = async (req, res, next) => {
  const videogameId = req.params.videogameId;

  const videogameDelete = await deleteVideogameSVC(videogameId);

  if (!videogameDelete) res.status(500);

  next();
};
