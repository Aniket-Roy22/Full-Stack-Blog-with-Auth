import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {createBlog} from "../api/blogApi";
import "../styles/form.css";

function CreatePost()
{
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		title: "",
		content: "",
	});

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
			await createBlog(formData);
			navigate("/");
		}
		catch (error)
		{
			console.error(error);
			alert("Failed to create post");
		}
	}

	return (
		<div className="form-container">
			<h1>Create Post</h1>

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
					Create
				</button>
			</form>
		</div>
	);
}

export default CreatePost;