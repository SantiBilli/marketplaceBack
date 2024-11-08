import { Router } from 'express';
import { cookieSender } from '../middlewares/cookies.js';
import { getProfilesCTL, modifyProfileCTL } from '../controller/profile.js';
import { validateToken } from '../middlewares/authenticator.js';
import { upload } from '../middlewares/fileUpload.js';

const profileRouter = Router();

profileRouter.patch('/profiles', upload.single('file'), validateToken, modifyProfileCTL, cookieSender);
profileRouter.get('/profiles', validateToken, getProfilesCTL, cookieSender);

export default profileRouter;
