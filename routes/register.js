import { Router } from "express";
import { registerCTL } from "../controller/register.js";

const registerRouter = Router();

registerRouter.post("/registers", registerCTL)

export default registerRouter