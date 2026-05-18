import prisma from "../config/prisma.js";

export async function getUserBlogs(req, res)
{
	try
	{
		const currentUserId = req.user.id;

		const blogs = await prisma.posts.findMany({
			where: {
				author_id: currentUserId,
			},
			select: {
				id: true,
				title: true,
				content: true,
				created_at: true,
			},
			orderBy: {
				created_at: "desc",
			},
		});

		return res.status(200).json({
			success: true,
			data: blogs,
		});
	}
	catch (error)
	{
		console.error("getUserBlogs error:", error);

		return res.status(500).json({
			success: false,
			message: "INTERNAL_SERVER_ERROR",
		});
	}
}