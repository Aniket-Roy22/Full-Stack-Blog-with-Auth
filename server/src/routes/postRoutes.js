import express from "express";
import {authenticateAccessToken} from "../middleware/authenticateTokens.js";
import {getUserBlogs} from "../controllers/getUserBlogs.js";
import {getAllBlogs} from "../controllers/getAllBlogs.js";

const router = express.Router();

router.get("/user", authenticateAccessToken, getUserBlogs);
router.get("/all", getAllBlogs);

export default router;