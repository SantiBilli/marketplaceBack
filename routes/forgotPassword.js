import { Router } from "express"
import { forgotPasswordCTL, changePasswordCTL } from "../controller/forgotPassword.js";

const forgotPasswordRouter = Router()

forgotPasswordRouter.post("/forget-password", forgotPasswordCTL)

forgotPasswordRouter.post("/change-password/:token", changePasswordCTL)

export default forgotPasswordRouter