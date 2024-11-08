import { Router } from 'express';
import { validateToken } from '../middlewares/authenticator.js';
import { getLibraryCTL, verifyLibraryVideogameCTL } from '../controller/library.js';
import { cookieSender } from '../middlewares/cookies.js';

const libraryRouter = Router();

libraryRouter.get('/library/:videogameId', validateToken, verifyLibraryVideogameCTL, cookieSender);
libraryRouter.get('/library', validateToken, getLibraryCTL, cookieSender);

export default libraryRouter;
