import { Router } from "express";
import { registerClientCTL } from "../controller/register.js";

const registerRouter = Router();

registerRouter.post("/register-client", registerClientCTL)

// registrarRouter.post("/registrar-empresa", )

export default registerRouter