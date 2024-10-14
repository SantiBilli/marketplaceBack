import { Router } from "express"
import { upload2 } from "../middlewares/fileUpload.js"
import { validateToken } from "../middlewares/authenticator.js"
import { obtainVideogamesCTL, registerVideogamesCTL } from "../controller/videogame.js"
import { cookieSender } from "../middlewares/cookies.js"

const videogameRouter = Router()

videogameRouter.post('/videogames', validateToken, upload2.single('file'), registerVideogamesCTL, cookieSender)

videogameRouter.get('/videogames', validateToken, obtainVideogamesCTL, cookieSender)

export default videogameRouter