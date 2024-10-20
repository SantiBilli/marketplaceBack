import { Router } from 'express';
import { validateToken } from '../middlewares/authenticator.js';
import { cookieSender } from '../middlewares/cookies.js';


const validateTokenRouter = Router();

validateTokenRouter.get('/validate-token', validateToken, cookieSender);

export default validateTokenRouter;