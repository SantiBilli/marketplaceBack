export const registerVideogamesCTL = async (req, res, next) => {

    const userData = res.locals.userData
    
    console.log(req.file);
    
    const publicaciones = "a" //SVC

    res.locals.response = {data: publicaciones}

    next()

}