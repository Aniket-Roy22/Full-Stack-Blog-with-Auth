import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {getBlogById, updateBlog} from "../api/blogApi";
import "../styles/form.css";

function EditPost()
{
	const navigate = useNavigate();

	const {id} = useParams();

	const [formData, setFormData] = useState({
		title: "",
		content: "",
	});

	useEffect(() => {
		fetchBlog();
	}, []);

	async function fetchBlog()
	{
		try
		{
			const res = await getBlogById(id);

			setFormData({
				title: res.data.data.title,
				content: res.data.data.content,
			});
		}
		catch (error)
		{
			console.error(error);
		}
	}

	function handleChange(event)
	{
		setFormData({
			...formData,
			[event.target.name]: event.target.value,
		});
	}

	async function handleSubmit(event)
	{
		event.preventDefault();

		try
		{
			await updateBlog(id, formData);
			navigate("/");
		}
		catch (error)
		{
			console.error(error);
			alert("Failed to update post");
		}
	}

	return (
		<div className="form-container">
			<h1>Edit Post</h1>

			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label>Title</label>

					<input
						type="text"
						name="title"
						value={formData.title}
						onChange={handleChange}
					/>
				</div>

				<div className="form-group">
					<label>Content</label>

					<textarea
						name="content"
						rows="8"
						value={formData.content}
						onChange={handleChange}
					/>
				</div>

				<button type="submit" className="submit-btn">
					Update
				</button>
			</form>
		</div>
	);
}

export default EditPost;