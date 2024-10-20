import { obtainVideogamesDetailSVC, obtainVideogamesSVC, registerVideogamesSVC } from "../services/videogame.js"
import fs from "fs"

export const registerVideogamesCTL = async (req, res, next) => {

    const userData = res.locals.userData
    const bodyParams = req.body
    const file = req.file
    const photo = file.filename
    const filters = bodyParams.filters.split(',')
    
    if (userData.role == 'client') {
        fs.unlinkSync(`uploads/videogamePhotos/${photo}`);
        res.status(401)
        return next()
    }

    const publicaciones = await registerVideogamesSVC(bodyParams.name, bodyParams.description, photo, filters, bodyParams.minRequirements, bodyParams.recRequirements, bodyParams.price, userData.userId)

    if (!publicaciones) res.status(500)

    res.status(201)

    next()
}

export const obtainVideogamesCTL = async (req, res, next) => {

    const {
        filters,
        qualification,
        page,
        limit
      } = req.query;
    
    let filtersArray;
    
    if (filters) {

        filtersArray = filters.split(',');
        
        if (filtersArray.includes('Single-Player')) {
            filtersArray[filtersArray.indexOf('Single-Player')] = 'SinglePlayer';
        }
        
        if (filtersArray.includes('Multi-Player')) {
            filtersArray[filtersArray.indexOf('Multi-Player')] = 'MultiPlayer';
        }
    }
    
    const videogames = await obtainVideogamesSVC(filtersArray, qualification, page, limit)

    if (!videogames) res.status(500)

    res.locals.response = {data: videogames}

    next()
}

export const obtainVideogamesDetailCTL = async (req, res, next) => {

    const videogameId = req.params.videogameId;

    const videogame = await obtainVideogamesDetailSVC(videogameId)

    res.locals.response = {data: videogame}

    next()
}