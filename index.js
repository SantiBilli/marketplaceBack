import express from "express";
import cors from "cors";
import pingRouter from "./routes/ping.js";
import registerRouter from "./routes/register.js";
import loginRouter from "./routes/login.js";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import videogameRouter from "./routes/videogame.js";
import profileRouter from "./routes/profile.js";
import validateTokenRouter from "./routes/validateToken.js";
import reviewsRouter from "./routes/reviews.js";
import wishlistRouter from "./routes/wishlist.js";
import statsRouter from "./routes/stats.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const videogamesDirectory = path.join(__dirname, "uploads/videogamePhotos");
const pfpDirectory = path.join(__dirname, "uploads/profilePhotos");

const app = express();
const PORT = process.env.PORT || 3550;

app.disable("x-powered-by")
app.use(cors(
    { credentials: true, origin: (origin, callback) => callback(null, origin) }
))

app.use(express.json({limit: "10mb"}))
app.use(cookieParser())

app.use(pingRouter)
app.use(registerRouter)
app.use(loginRouter)
app.use(videogameRouter)
app.use(profileRouter)
app.use(validateTokenRouter)
app.use(reviewsRouter)
app.use(wishlistRouter)
app.use(statsRouter)

app.use('/videogame', express.static(videogamesDirectory))
app.use('/pfp', express.static(pfpDirectory))

app.listen(PORT, () => {
    console.log(`Server listening on https//localhost:${PORT}`)
})