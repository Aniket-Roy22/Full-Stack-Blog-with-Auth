import {useEffect, useState} from "react";
import {getAllBlogs, deleteBlog} from "../api/blogApi.js";
import BlogCard from "../components/BlogCard.jsx";
import {useAuth} from "../context/AuthContext.jsx";
import "../styles/home.css";

function Home()
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
			const res = await getAllBlogs();
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
		return <h1 className="homepage-heading">Loading...</h1>;
	}

	return (
		<div className="home-container">
			<h1 className="homepage-heading">Latest Blogs</h1>

			{blogs.map((blog) => (
				<BlogCard
					key={blog.id}
					blog={blog}
					currentUserId={user?.id}
					onDelete={handleDelete}
				/>
			))}
		</div>
	);
}

export default Home;