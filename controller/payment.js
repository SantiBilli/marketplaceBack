import { addToLibrarySVC } from '../services/payment.js';

export const paymentCTL = async (req, res, next) => {
  const videogameId = req.params.videogameId;
  const bodyParams = req.body;
  const userData = res.locals.userData;

  console.log(bodyParams);
  console.log(videogameId);
  console.log(userData);

  if (bodyParams.cardNumber != '0000000000000000') {
    res.status(498);
    return next();
  }

  const addToLibrary = await addToLibrarySVC(videogameId, userData.userId);

  if (!addToLibrary) {
    res.status(500);
  }

  next();
};
