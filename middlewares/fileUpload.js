import multer from "multer";
import fs from "fs";

export const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      
      if (!fs.existsSync('uploads/profilePhotos/')) {
        fs.mkdirSync('uploads/profilePhotos/', { recursive: true });
      }

      cb(null, 'uploads/profilePhotos/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "_" + file.originalname
      req.customFile = uniqueSuffix
      cb(null, uniqueSuffix)
    }
  })


export const storage2 = multer.diskStorage({
    destination: function (req, file, cb) {

      if (!fs.existsSync('uploads/videogamePhotos/')) {
        fs.mkdirSync('uploads/videogamePhotos/', { recursive: true });
      }

      cb(null, 'uploads/videogamePhotos/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "_" + file.originalname
      req.customFile = uniqueSuffix
      cb(null, uniqueSuffix)
    }
})
  
export const upload = multer({ storage: storage })
export const upload2 = multer({ storage: storage2 })


