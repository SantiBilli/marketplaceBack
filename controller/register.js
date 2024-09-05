import { emailExistsSVC, registerBusinessSVC, registerClientSVC } from "../services/register.js"

export const registerCTL = async (req, res) => {
    
    const bodyParams = req.body

    const emailExists = await emailExistsSVC(bodyParams.email)
    
    if (emailExists) return res.status(409).send("Email already exists.")

    if (bodyParams.role == "client") {

        const registerClient =  await registerClientSVC(bodyParams.name, bodyParams.surname, bodyParams.email, bodyParams.date, bodyParams.password)

    } else if (bodyParams.role == "business") {

        const pfp = ".png"
    
        const registerBusiness =  await registerBusinessSVC(bodyParams.name, bodyParams.email, pfp, bodyParams.description, bodyParams.password)
        
    }

    if (!registerBusinessSVC == 500 || !registerClientSVC == 500) return res.status(500).send("Database Error.")

    return res.status(201).send("Created.")
}