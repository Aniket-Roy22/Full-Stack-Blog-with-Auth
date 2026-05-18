import prisma from "../config/prisma.js";

export async function getAllBlogs(req, res)
{
	try
	{
		const blogs = await prisma.posts.findMany({
			select: {
				id: true,
				title: true,
				content: true,
				created_at: true,
				users: {
					select: {
						id: true,
						username: true,
					},
				},
			},
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