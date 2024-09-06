import { Router } from "express"
import { upload } from "../middlewares/fileUpload.js"
import { validateToken } from "../middlewares/authenticator.js"
import { registerVideogamesCTL } from "../controller/registerVideogames.js"
import { cookieSender } from "../middlewares/cookies.js"

const registerVideogamesRouter = Router()

registerVideogamesRouter.post('/videogames', validateToken, upload.single('file'), registerVideogamesCTL, cookieSender)

export default registerVideogamesRouter