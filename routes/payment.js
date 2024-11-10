import { Router } from 'express';
import { validateToken } from '../middlewares/authenticator.js';
import { cookieSender } from '../middlewares/cookies.js';
import { paymentCTL, paymentVideogameDetailsCTL } from '../controller/payment.js';

const paymentRouter = Router();

paymentRouter.get('/payments/:videogameId', validateToken, paymentVideogameDetailsCTL, cookieSender);
paymentRouter.post('/payments/:videogameId', validateToken, paymentCTL, cookieSender);

export default paymentRouter;
