import { getLibraryCountSVC, getLibrarySVC, verifyLibraryVideogameSVC } from '../services/library.js';

export const verifyLibraryVideogameCTL = async (req, res, next) => {
  const videogameId = req.params.videogameId;
  const userData = res.locals.userData;
  const userId = userData.userId;

  if (userData.role == 'business') {
    res.status(204);
    return next();
  }

  const verifyVideogameLibrary = await verifyLibraryVideogameSVC(videogameId, userId);

  if (verifyVideogameLibrary == 500) {
    res.status(500);
  }
  if (verifyVideogameLibrary == 204) {
    res.status(204);
  }

  next();
};

export const getLibraryCTL = async (req, res, next) => {
  const userData = res.locals.userData;
  const userId = userData.userId;

  const { page, limit } = req.query;

  if (userData.role == 'business') {
    res.status(401);
    return next();
  }

  const library = await getLibrarySVC(userId, page, limit);
  const libraryCount = await getLibraryCountSVC(userId);

  if (library == 500 || libraryCount == 500) {
    res.status(500);
    return next();
  }

  res.locals.response = {
    data: {
      library: library,
      libraryCount: libraryCount[0].libraryCount,
    },
  };

  next();
};
