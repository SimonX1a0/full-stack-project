import express from "express";
import {homePage} from "../controllers/pageControllers.js"

const router = express.Router();

router.get("/", homePage)

export default router;