import {Link, useNavigate} from "react-router-dom";
import {logoutUser} from "../api/authApi";
import {useAuth} from "../context/AuthContext";
import "../styles/navbar.css";

function Navbar()
{
	const navigate = useNavigate();
	const {user, setUser} = useAuth();
	
	async function handleLogout()
	{
		try
		{
			await logoutUser();
			localStorage.removeItem("accessToken");
			setUser(null);
			navigate("/login");
		}
		catch (error) 
		{
			console.error(error);
		}
	}

	return (
		<nav className="navbar">
			<div className="navbar-left">
				<Link to="/" className="logo">
					BlogApp
				</Link>
			</div>

			<div className="navbar-right">
				{user ? (
					<>
						<Link to="/" className="nav-link">
							Home
						</Link>

						<Link to="/myposts" className="nav-link">
							My Posts
						</Link>

						<Link to="/create" className="nav-link">
							Create Post
						</Link>

						<button className="logout-btn" onClick={handleLogout}>
							Logout
						</button>
					</>
				) : (
					<>
						<Link to="/login" className="nav-link">
							Login
						</Link>

						<Link to="/register" className="nav-link">
							Register
						</Link>
					</>
				)}
			</div>
		</nav>
	);
}

export default Navbar;