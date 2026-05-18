import prisma from "../config/prisma.js";

export async function deletePost(req, res) {
	try {
		const {id} = req.params;
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

		await prisma.posts.delete({
			where: {
				id,
			},
		});

		return res.status(200).json({
			success: true,
			message: "POST_DELETED_SUCCESSFULLY",
		});
	} catch (error) {
		console.error("deletePost error:", error);

		return res.status(500).json({
			message: "INTERNAL_SERVER_ERROR",
		});
	}
}