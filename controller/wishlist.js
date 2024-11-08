import {
  wishlistAddSVC,
  wishlistDeleteSVC,
  wishlistObtainCountSVC,
  wishlistObtainSVC,
  wishlistVerifySVC,
} from '../services/wishlist.js';

export const wishlistAddCTL = async (req, res, next) => {
  const videogameId = req.params.videogameId;
  const userData = res.locals.userData;
  const userId = userData.userId;

  if (userData.role == 'business') {
    res.status(401);
    return next();
  }

  const wishlistAdd = await wishlistAddSVC(videogameId, userId);

  if (wishlistAdd == 500) {
    res.status(500);
  }

  next();
};

export const wishlistDeleteCTL = async (req, res, next) => {
  const videogameId = req.params.videogameId;
  const userData = res.locals.userData;
  const userId = userData.userId;

  if (userData.role == 'business') {
    res.status(401);
    return next();
  }

  const wishlistDelete = await wishlistDeleteSVC(videogameId, userId);

  if (wishlistDelete == 500) {
    res.status(500);
  }

  next();
};

export const verifyWishlistVideogameCTL = async (req, res, next) => {
  const videogameId = req.params.videogameId;
  const userData = res.locals.userData;
  const userId = userData.userId;

  if (userData.role == 'business') {
    res.status(204);
    return next();
  }

  const wishlistVerify = await wishlistVerifySVC(videogameId, userId);

  if (wishlistVerify == 500) {
    res.status(500);
  }
  if (wishlistVerify == 204) {
    res.status(204);
  }

  next();
};

export const obtainVideogamesCTL = async (req, res, next) => {
  const userData = res.locals.userData;
  const userId = userData.userId;

  const { page, limit } = req.query;

  if (userData.role == 'business') {
    res.status(401);
    return next();
  }

  const wishlist = await wishlistObtainSVC(userId, page, limit);
  const wishlistCount = await wishlistObtainCountSVC(userId);

  if (wishlist == 500) {
    res.status(500);
  }
  if (wishlist == 204) {
    res.status(204);
  }

  res.locals.response = {
    data: {
      wishlist: wishlist,
      wishlistCount: wishlistCount[0].wishlistCount,
    },
  };

  next();
};
