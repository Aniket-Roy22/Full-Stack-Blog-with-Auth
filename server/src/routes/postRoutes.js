import express from "express";
import {authenticateAccessToken} from "../middleware/authenticateTokens.js";
import {getBlogById, getBlogsAll, getBlogsByUser} from "../controllers/getBlog.js";
import {createPost} from "../controllers/createBlog.js";
import {updatePost} from "../controllers/updateBlog.js";
import {deletePost} from "../controllers/deleteBlog.js";

const router = express.Router();

router.post("/create", authenticateAccessToken, createPost);
router.get("/all", getBlogsAll);
router.get("/user", getBlogsByUser);
router.get("/:id", getBlogById);
router.patch("/update/:id", authenticateAccessToken, updatePost);
router.delete("/delete/:id", authenticateAccessToken, deletePost);

export default router;