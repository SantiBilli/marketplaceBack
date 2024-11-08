import { Router } from 'express';
import { cookieSender } from '../middlewares/cookies.js';
import { validateToken } from '../middlewares/authenticator.js';
import {
  obtainVideogamesCTL,
  verifyWishlistVideogameCTL,
  wishlistAddCTL,
  wishlistDeleteCTL,
} from '../controller/wishlist.js';

const wishlistRouter = Router();

wishlistRouter.put('/wishlist/:videogameId', validateToken, wishlistAddCTL, cookieSender);
wishlistRouter.delete('/wishlist/:videogameId', validateToken, wishlistDeleteCTL, cookieSender);
wishlistRouter.get('/wishlist/:videogameId', validateToken, verifyWishlistVideogameCTL, cookieSender);
wishlistRouter.get('/wishlist', validateToken, obtainVideogamesCTL, cookieSender); //Obtener todos los juegos de la wishlist de un usuario especifico

export default wishlistRouter;
