import { Router } from "express"
import { upload2 } from "../middlewares/fileUpload.js"
import { validateToken } from "../middlewares/authenticator.js"
import { obtainVideogamesCTL, registerVideogamesCTL, obtainVideogamesDetailCTL, obtainVideogamesUploadsCTL, obtainVideogameUploadsDetailsCTL, editVideogameUploadCTL, deleteVideogameCTL} from "../controller/videogame.js"
import { cookieSender } from "../middlewares/cookies.js"

const videogameRouter = Router()

videogameRouter.post('/videogames', validateToken, upload2.single('file'), registerVideogamesCTL, cookieSender)

videogameRouter.get('/videogames', validateToken, obtainVideogamesCTL, cookieSender)

videogameRouter.get('/videogames/details/:videogameId', validateToken, obtainVideogamesDetailCTL, cookieSender)

videogameRouter.get('/videogames/uploads', validateToken, obtainVideogamesUploadsCTL, cookieSender)

videogameRouter.get('/videogames/uploads/details/:videogameId', validateToken, obtainVideogameUploadsDetailsCTL, cookieSender)

videogameRouter.patch('/videogames', validateToken, upload2.single('file'), editVideogameUploadCTL, cookieSender)

videogameRouter.delete('/videogames/:videogameId', validateToken, deleteVideogameCTL, cookieSender)


export default videogameRouter