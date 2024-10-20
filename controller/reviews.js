import { insertReviewSVC, obtainReviewsSVC } from "../services/reviews.js";

export const createReviewCTL = async (req, res, next) => {

    const videogameId = req.params.videogameId;
    const bodyParams = req.body
    
    const userData = res.locals.userData

    if (userData.role == 'business') {
        res.status(401)
        return next()
    }

    const { comment, rating } = bodyParams

    const results = await insertReviewSVC(videogameId, userData.userId, comment, rating)

    if (!results) { res.status(500) }

    next()
}

export const obtainReviewsCTL = async (req, res, next) => {
    
    const videogameId = req.params.videogameId;

    const results = await obtainReviewsSVC(videogameId)

    if (!results) { res.status(500) }

    res.locals.response = { data: results }

    next()
}