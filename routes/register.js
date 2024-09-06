import { Router } from "express";
import { registerBusinessCTL, registerClientCTL,  } from "../controller/register.js";
import { upload } from "../middlewares/fileUpload.js";

const registerRouter = Router();

registerRouter.post("/registers/clients", registerClientCTL)
registerRouter.post("/registers/businesses", upload.single('file'), registerBusinessCTL)

export default registerRouter