import { Router } from "express"
import { upload2 } from "../middlewares/fileUpload.js"
import { validateToken } from "../middlewares/authenticator.js"
import { obtainVideogamesCTL, registerVideogamesCTL } from "../controller/registerVideogames.js"
import { cookieSender } from "../middlewares/cookies.js"

const registerVideogamesRouter = Router()

registerVideogamesRouter.post('/videogames', validateToken, upload2.single('file'), registerVideogamesCTL, cookieSender)

registerVideogamesRouter.get('/videogames', validateToken, obtainVideogamesCTL, cookieSender)

export default registerVideogamesRouter