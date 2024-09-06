import multer from "multer";
import fs from "fs";

export const storage = multer.diskStorage({

    
    destination: function (req, file, cb) {

      if (!fs.existsSync('uploads/')) {
        fs.mkdirSync('uploads/', { recursive: true });
      }

      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "_" + file.originalname
      req.customFile = uniqueSuffix
      cb(null, uniqueSuffix)
    }
  })
  
  
export const upload = multer({ storage: storage })

