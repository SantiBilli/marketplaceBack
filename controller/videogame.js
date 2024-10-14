import { obtainVideogamesSCV, registerVideogamesSCV } from "../services/videogame.js"
import fs from "fs"

export const registerVideogamesCTL = async (req, res, next) => {

    const userData = res.locals.userData
    const bodyParams = req.body
    const file = req.file
    const photo = file.filename
    const filters = bodyParams.filters.split(',')
    
    if (userData.role == 'client') {
        fs.unlinkSync(`uploads/videogamePhotos/${photo}`);
        res.status(403)
        return next()
    }

    const publicaciones = await registerVideogamesSCV(bodyParams.name, bodyParams.description, photo, filters, bodyParams.minRequirements, bodyParams.recRequirements, bodyParams.price, userData.userId)

    if (!publicaciones) res.status(500)

    res.status(201)

    next()
}

export const obtainVideogamesCTL = async (req, res, next) => {

    const {
        filter,
        qualification,
        page,
        limit
      } = req.query;

    let filtersArray = [];
    
    const addToArray = (value) => {
        if (value) {
            return Array.isArray(value) ? value : [value];
        }
        return [];
    };

    filtersArray.push(...addToArray(filter));

    if (filtersArray.includes('Single-Player')) {
        filtersArray[filtersArray.indexOf('Single-Player')] = 'SinglePlayer';
    }
      
    if (filtersArray.includes('Multi-Player')) {
        filtersArray[filtersArray.indexOf('Multi-Player')] = 'MultiPlayer';
    }

    const videogames = await obtainVideogamesSCV(filtersArray, qualification, page, limit)

    res.locals.response = {data: videogames}

    next()

}