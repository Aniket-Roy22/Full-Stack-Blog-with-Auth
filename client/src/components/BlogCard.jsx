import {Link} from "react-router-dom";
import "../styles/blogcard.css";

function BlogCard({blog, currentUserId, onDelete, isSingle = false})
{
	const isOwner = currentUserId === blog.users.id;

	return (
		<div className="blog-card">
			{isSingle ? (
				<div className="blog-link">
					<h2>{blog.title}</h2>

					<p className="blog-author">By {blog.users.username}</p>

					<p className="blog-content">{blog.content}</p>
				</div>
			) : (
				<Link to={`/blogs/${blog.id}`} className="blog-link">
					<h2>{blog.title}</h2>

					<p className="blog-author">By {blog.users.username}</p>

					<p className="blog-content">
						{blog.content.slice(0, 200)}
						{blog.content.length > 200 ? "..." : ""}
					</p>
				</Link>
			)}

			<div className="blog-footer">
				<span>{new Date(blog.created_at).toLocaleDateString()}</span>

				{isOwner && (
					<div className="blog-actions">
						<Link to={`/edit/${blog.id}`} className="edit-btn">
							Edit
						</Link>

						<button
							className="delete-btn"
							onClick={() => onDelete(blog.id)}
						>
							Delete
						</button>
					</div>
				)}
			</div>
		</div>
	);
}

export default BlogCard;