import express from "express";
import {authenticateRefreshToken} from "../middleware/authenticateTokens.js";
import {localAuth} from "../middleware/localAuth.js";
import {registerUser} from "../middleware/registerUser.js";
import {issueTokens} from "../controllers/issueTokens.js";
import {regenAccessToken} from "../controllers/regenAccessToken.js";
import { getCurrentUser } from "../controllers/getCurrentUser.js";

const router = express.Router();

router.get("/me", authenticateRefreshToken, getCurrentUser);
router.post("/login", localAuth, issueTokens);
router.post("/register", registerUser, issueTokens);
router.post("/token", authenticateRefreshToken, regenAccessToken);

export default router;
