import { Router } from "express";
import { validateToken } from "../middlewares/authenticator.js";
import { createReviewCTL, obtainReviewsCTL } from "../controller/reviews.js";
import { cookieSender } from "../middlewares/cookies.js";

const reviewsRouter = Router();

reviewsRouter.post("/comments/:videogameId", validateToken, createReviewCTL, cookieSender)
reviewsRouter.get("/comments/:videogameId", validateToken, obtainReviewsCTL, cookieSender)

export default reviewsRouter