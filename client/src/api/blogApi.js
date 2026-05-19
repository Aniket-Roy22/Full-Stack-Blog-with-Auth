import api from "./api";

export async function getAllBlogs()
{
	return api.get("/blogs/all");
}

export async function getUserBlogs()
{
	return api.get("/blogs/user");
}

export async function getBlogById(id)
{
	return api.get(`/blogs/${id}`);
}

export async function createBlog(data)
{
	return api.post("/blogs/create", data);
}

export async function updateBlog(id, data)
{
	return api.patch(`/blogs/update/${id}`, data);
}

export async function deleteBlog(id)
{
	return api.delete(`/blogs/delete/${id}`);
}