import { generateToken } from "./authenticator.js"

export const cookieSender = (req, res) => {

    const payload = res.locals.userData || null 

    // console.log(payload);
    
    const token = generateToken(payload) //Inactividad
    
    return res.cookie("auth", token).json(res.locals.response?.data)

}