import prisma from "../config/prisma.js";
import { postSelect } from "../constants/postStructure.js";

export async function createPost(req, res) {
	try {
		const {title, content} = req.body;
		const userId = req.user.id;

		if (!title || !content) {
			return res.status(400).json({
				message: "MISSING_FIELDS",
			});
		}

		const post = await prisma.posts.create({
			data: {
				title,
				content,
				author_id: userId,
			},
			select: postSelect,
		});

		return res.status(201).json({
			success: true,
			data: post,
		});
	} catch (error) {
		console.error("createPost error:", error);

		return res.status(500).json({
			message: "INTERNAL_SERVER_ERROR",
		});
	}
}
