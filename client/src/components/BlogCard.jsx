import {Link} from "react-router-dom";
import "../styles/blogcard.css";

function BlogCard({blog, currentUserId, onDelete, isSingle = false})
{
	const isOwner = currentUserId === blog.users.id;

	return (
		<Link to={`/blogs/${blog.id}`} className="blog-link">
			<div className="blog-card">
				{isSingle ? (
					<div className="blog-link">
						<h2>{blog.title}</h2>

						<p className="blog-author">By {blog.users.username}</p>

						<p className="blog-content">{blog.content}</p>
					</div>
				) : (
					<>
						<h2>{blog.title}</h2>

						<p className="blog-author">By {blog.users.username}</p>

						<p className="blog-content">
							{blog.content.slice(0, 100)}
							{blog.content.length > 100 ? "..." : ""}
						</p>
					</>
				)}

				<div className="blog-footer">
					<span className="blog-date">
						{new Date(blog.created_at).toLocaleDateString()}
					</span>

					{isOwner && (
						<div className="blog-actions">
							<Link to={`/edit/${blog.id}`} className="edit-btn">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									fill="#2563eb"
									viewBox="0 0 256 256"
								>
									<path d="M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM92.69,208H48V163.31l88-88L180.69,120ZM192,108.68,147.31,64l24-24L216,84.68Z"></path>
								</svg>
							</Link>

							<div
								className="delete-btn"
								onClick={() => onDelete(blog.id)}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									fill="#dc2626"
									viewBox="0 0 256 256"
								>
									<path d="M216,48H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM192,208H64V64H192ZM80,24a8,8,0,0,1,8-8h80a8,8,0,0,1,0,16H88A8,8,0,0,1,80,24Z"></path>
								</svg>
							</div>
						</div>
					)}
				</div>
			</div>
		</Link>
	);
}

export default BlogCard;