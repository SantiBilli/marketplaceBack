import { obtainStatsCountSVC, obtainStatSVC } from '../services/stats.js';

export const obtainStatsCTL = async (req, res, next) => {
  const userData = res.locals.userData;
  const userId = userData.userId;

  const { page, limit } = req.query;

  if (userData.role == 'client') {
    res.status(401);
    return next();
  }

  const response = await obtainStatSVC(userId, page, limit);
  const count = await obtainStatsCountSVC(userId);

  if (response === 500 || count === 500) {
    res.status(500);
    return next();
  }

  res.locals.response = {
    data: {
      results: response,
      count: count,
    },
  };

  next();
};
