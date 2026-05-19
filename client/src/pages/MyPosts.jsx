import {useEffect, useState} from "react";
import {getUserBlogs, deleteBlog} from "../api/blogApi";
import BlogCard from "../components/BlogCard";
import {useAuth} from "../context/AuthContext";
import "../styles/home.css";

function MyPosts()
{
	const {user} = useAuth();
	const [blogs, setBlogs] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchBlogs();
	}, []);

	async function fetchBlogs()
	{
		try
		{
			const res = await getUserBlogs();
			setBlogs(res.data.data);
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
			setBlogs((prevBlogs) =>
				prevBlogs.filter((blog) => blog.id !== blogId),
			);
		}
		catch (error)
		{
			console.error(error);
		}
	}

	if (loading)
	{
		return <h1>Loading...</h1>;
	}

	return (
		<div className="home-container">
			<h1>My Posts</h1>

			{blogs.length === 0 ? (
				<h2>No posts found</h2>
			) : (
				blogs.map((blog) => (
					<BlogCard
						key={blog.id}
						blog={blog}
						currentUserId={user?.id}
						onDelete={handleDelete}
					/>
				))
			)}
		</div>
	);
}

export default MyPosts;