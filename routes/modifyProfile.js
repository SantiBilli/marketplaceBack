import { Router } from "express";
import { cookieSender } from "../middlewares/cookies.js";
import { modifyProfileCTL } from "../controller/modifyProfile.js";
import { validateToken } from "../middlewares/authenticator.js";
import { upload } from "../middlewares/fileUpload.js";

const modifyProfileRouter = Router()

modifyProfileRouter.patch("/modify-profiles", upload.single('file'), validateToken, modifyProfileCTL, cookieSender)

export default modifyProfileRouter