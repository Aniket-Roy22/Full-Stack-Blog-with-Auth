import prisma from "../config/prisma.js";
import { postSelect } from "../constants/postStructure.js";

export async function updatePost(req, res) {
	try {
		const {id} = req.params;
		const {title, content} = req.body;
		const userId = req.user.id;

		const existingPost = await prisma.posts.findUnique({
			where: {
				id,
			},
			select: {
				id: true,
				author_id: true,
			},
		});

		if (!existingPost) {
			return res.status(404).json({
				message: "POST_NOT_FOUND",
			});
		}

		if (existingPost.author_id !== userId) {
			return res.status(403).json({
				message: "UNAUTHORIZED",
			});
		}

		const updatedPost = await prisma.posts.update({
			where: {id},
			data: {
				...(title && {title}),
				...(content && {content})
			},
			select: postSelect,
		});

		return res.status(200).json({
			success: true,
			data: updatedPost,
		});
	} catch (error) {
		console.error("updatePost error:", error);

		return res.status(500).json({
			message: "INTERNAL_SERVER_ERROR",
		});
	}
}