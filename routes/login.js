import { Router } from "express";
import { loginCTL } from "../controller/login.js";

const loginRouter = Router()

loginRouter.post("/login", loginCTL)

export default loginRouter