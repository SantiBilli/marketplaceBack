import { obtainStatSVC } from "../services/stats.js"

export const obtainStatsCTL = async (req, res, next) => {

    const userData = res.locals.userData
    const userId = userData.userId

    if (userData.role == "client") {
        res.status(401)
        return next()
    }

    const response = await obtainStatSVC(userId)

    if (!response) { res.status(500) }
    
    res.locals.response = { data: response }

    next()
}