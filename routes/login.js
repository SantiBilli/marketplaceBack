import { Router } from 'express';
import { loginCTL } from '../controller/login.js';
import { cookieSender } from '../middlewares/cookies.js';

const loginRouter = Router();

loginRouter.post('/logins', loginCTL, cookieSender);

export default loginRouter;
