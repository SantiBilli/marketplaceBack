import { addToLibrarySVC } from '../services/payment.js';

export const paymentCTL = async (req, res, next) => {
  const videogameId = req.params.videogameId;
  const bodyParams = req.body;
  const userData = res.locals.userData;

  if (bodyParams.cardNumber != '0000000000000000' && bodyParams.price != 0) {
    res.status(498);
    return next();
  }

  const addToLibrary = await addToLibrarySVC(videogameId, userData.userId);

  if (addToLibrary == 500) {
    res.status(500);
  }

  next();
};
