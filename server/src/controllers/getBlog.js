import prisma from "../config/prisma.js";
import {postSelect} from "../constants/postStructure.js";

export async function getBlogsByUser(req, res) {
	try {
		const currentUserId = req.user.id;

		const blogs = await prisma.posts.findMany({
			where: {
				author_id: currentUserId,
			},
			select: postSelect,
			orderBy: {
				created_at: "desc",
			},
		});

		return res.status(200).json({
			success: true,
			data: blogs,
		});
	} catch (error) {
		console.error("getUserBlogs error:", error);

		return res.status(500).json({
			success: false,
			message: "INTERNAL_SERVER_ERROR",
		});
	}
}

export async function getBlogsAll(req, res) {
	try {
		const blogs = await prisma.posts.findMany({
			select: postSelect,
			orderBy: {
				created_at: "desc",
			},
		});

		return res.status(200).json({
			success: true,
			data: blogs,
		});
	} catch (error) {
		console.error("getAllBlogs error:", error);

		return res.status(500).json({
			success: false,
			message: "INTERNAL_SERVER_ERROR",
		});
	}
}

export async function getBlogById(req, res) {
	try {
		const {id} = req.params;

		const post = await prisma.posts.findUnique({
			where: {
				id,
			},
			select: postSelect,
		});

		if (!post) {
			return res.status(404).json({
				message: "POST_NOT_FOUND",
			});
		}

		return res.status(200).json({
			success: true,
			data: post,
		});
	} catch (error) {
		console.error("getBlogById error:", error);

		return res.status(500).json({
			message: "INTERNAL_SERVER_ERROR",
		});
	}
}