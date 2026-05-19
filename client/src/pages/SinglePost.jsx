import {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {getBlogById, deleteBlog} from "../api/blogApi.js";
import BlogCard from "../components/BlogCard.jsx";
import {useAuth} from "../context/AuthContext.jsx";

function SinglePost()
{
	const {id} = useParams();
	const navigate = useNavigate();
	const {user} = useAuth();
	const [blog, setBlog] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchBlog();
	}, [id]);

	async function fetchBlog()
	{
		try
		{
			const res = await getBlogById(id);
			setBlog(res.data.data);
		}
		catch (error)
		{
			console.error(error);
		}
		finally
		{
			setLoading(false);
		}
	}

	async function handleDelete(blogId)
	{
		try
		{
			await deleteBlog(blogId);
			navigate("/");
		}
		catch (error)
		{
			console.error(error);
			alert("Failed to delete blog");
		}
	}

	if (loading)
	{
		return <h1>Loading...</h1>;
	}

	if (!blog) {
		return <h1>Blog not found</h1>;
	}

	return (
		<div className="single-post-container">
			<BlogCard
				blog={blog}
				currentUserId={user?.id}
				onDelete={handleDelete}
				isSingle={true}
			/>
		</div>
	);
}

export default SinglePost;