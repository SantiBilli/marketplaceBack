import { generateToken } from "./authenticator.js"

export const cookieSender = (req, res) => {

    const payload = res.locals.userData || null 

    console.log(payload);
    
    const token = generateToken(payload) //Inactividad
    
    res.cookie("auth", token, { httpOnly: true}).json(res.locals.response?.data)

    return 
}