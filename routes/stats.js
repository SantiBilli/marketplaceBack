import { Router } from 'express';
import { validateToken } from '../middlewares/authenticator.js';
import { cookieSender } from '../middlewares/cookies.js';
import { obtainStatsCTL } from '../controller/stats.js';

const statsRouter = Router();

statsRouter.get('/stats', validateToken, obtainStatsCTL, cookieSender);

export default statsRouter;
