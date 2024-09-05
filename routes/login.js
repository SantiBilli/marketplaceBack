import { Router } from "express";
import { loginCTL } from "../controller/login.js";

const loginRouter = Router()

loginRouter.post("/logins", loginCTL)

export default loginRouter