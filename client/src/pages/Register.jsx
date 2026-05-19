import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {registerUser} from "../api/authApi";
import {useAuth} from "../context/AuthContext";
import "../styles/form.css";

function Register()
{
	const navigate = useNavigate();
	const {setUser} = useAuth();
	const [formData, setFormData] = useState({
		username: "",
		email: "",
		password: "",
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
			const res = await registerUser(formData);
			localStorage.setItem("accessToken", res.data.accessToken);
			setUser(res.data.user);
			navigate("/");
		}
		catch (error)
		{
			console.error(error);
			alert("Registration failed");
		}
	}

	return (
		<div className="form-container">
			<h1>Register</h1>

			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label>Username</label>

					<input
						type="text"
						name="username"
						value={formData.username}
						onChange={handleChange}
					/>
				</div>

				<div className="form-group">
					<label>Email</label>

					<input
						type="email"
						name="email"
						value={formData.email}
						onChange={handleChange}
					/>
				</div>

				<div className="form-group">
					<label>Password</label>

					<input
						type="password"
						name="password"
						value={formData.password}
						onChange={handleChange}
					/>
				</div>

				<button type="submit" className="submit-btn">
					Register
				</button>
			</form>
		</div>
	);
}

export default Register;