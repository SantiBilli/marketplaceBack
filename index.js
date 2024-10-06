import express from "express";
import cors from "cors";
import pingRouter from "./routes/ping.js";
import registerRouter from "./routes/register.js";
import loginRouter from "./routes/login.js";
import registerVideogamesRouter from "./routes/registerVideogame.js";
import cookieParser from "cookie-parser";
import modifyProfileRouter from "./routes/modifyProfile.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const videogamesDirectory = path.join(__dirname, "uploads/videogamePhotos");

const app = express();
const PORT = process.env.PORT || 3550;

app.disable("x-powered-by")
app.use(cors())

app.use(express.json({limit: "10mb"}))
app.use(cookieParser())

app.use(pingRouter)
app.use(registerRouter)
app.use(loginRouter)
app.use(registerVideogamesRouter)
app.use(modifyProfileRouter)

app.use('/image', express.static(videogamesDirectory))

app.listen(PORT, () => {
    console.log(`Server listening on https//localhost:${PORT}`)
})