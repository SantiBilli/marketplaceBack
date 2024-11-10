import { insertReviewSVC, obtainReviewsSVC, reviewsCountSVC } from '../services/reviews.js';

export const createReviewCTL = async (req, res, next) => {
  const videogameId = req.params.videogameId;
  const bodyParams = req.body;

  const userData = res.locals.userData;

  if (userData.role == 'business') {
    res.status(401);
    return next();
  }

  const { comment, rating } = bodyParams;

  const results = await insertReviewSVC(videogameId, userData.userId, comment, rating);

  if (results == 500) {
    res.status(500);
  }

  next();
};

export const obtainReviewsCTL = async (req, res, next) => {
  const videogameId = req.params.videogameId;
  const { page, limit } = req.query;

  const results = await obtainReviewsSVC(videogameId, page, limit);
  const count = await reviewsCountSVC(videogameId);

  if (results == 500 || count == 500) {
    res.status(500);
    return next();
  }

  res.locals.response = {
    data: {
      reviews: results,
      count: count,
    },
  };

  next();
};
