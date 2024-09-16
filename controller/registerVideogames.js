import { obtainVideogamesSCV, registerVideogamesSCV } from "../services/registerVideogames.js"
import fs from "fs"
export const registerVideogamesCTL = async (req, res, next) => {

    const userData = res.locals.userData
    const bodyParams = req.body
    const file = req.file
    const photo = file.filename

    console.log(userData);
    

    if (userData.role == 'client') {
        fs.unlinkSync(`uploads/videogamePhotos/${photo}`);
        res.status(403)
        return next()
    }

    //TEMPORAL
    const category = bodyParams.category.split(",")
        .map(item => item.trim());

    const operating_system = bodyParams.operating_system.split(",")
        .map(item => item.trim());

    const language = bodyParams.language.split(",")
        .map(item => item.trim());

    const players = bodyParams.players.split(",")
        .map(item => item.trim());
    
    
    const publicaciones = await registerVideogamesSCV(bodyParams.name, bodyParams.description, photo, category, operating_system, language, players, bodyParams.minRequirements, bodyParams.recRequirements, bodyParams.price, bodyParams.userId)

    if (!publicaciones) res.status(500)

    res.status(201)

    next()
}

export const obtainVideogamesCTL = async (req, res, next) => {

    const {
        category,
        operating_system,
        language,
        players,
        qualification,
        page,
        limit
      } = req.query;

    const videogames = await obtainVideogamesSCV(category, operating_system, language, players, qualification, page, limit)
    
    // const publicaciones = await registerVideogamesSCV()

    // res.locals.response = {data: publicaciones}

    next()

}