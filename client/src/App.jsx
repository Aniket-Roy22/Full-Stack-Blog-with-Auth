import {BrowserRouter, Routes, Route} from "react-router-dom";
import {AuthProvider} from "./context/AuthContext";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import MyPosts from "./pages/MyPosts";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import SinglePost from "./pages/SinglePost";

function App()
{
	return (
		<AuthProvider>
			<BrowserRouter>
				<AppContent />
			</BrowserRouter>
		</AuthProvider>
	);
}

function AppContent()
{
	return (
		<>
			{/* TOP NAVBAR */}
			<Navbar />

			{/* MAIN PAGE CONTENT */}
			<main>
				<Routes>
					<Route path="/" element={<Home />} />

					<Route path="/login" element={<Login />} />

					<Route path="/register" element={<Register />} />

					<Route path="/blogs/:id" element={<SinglePost />} />

					<Route
						path="/myposts"
						element={
							<ProtectedRoute>
								<MyPosts />
							</ProtectedRoute>
						}
					/>

					<Route
						path="/create"
						element={
							<ProtectedRoute>
								<CreatePost />
							</ProtectedRoute>
						}
					/>

					<Route
						path="/edit/:id"
						element={
							<ProtectedRoute>
								<EditPost />
							</ProtectedRoute>
						}
					/>
				</Routes>
			</main>
		</>
	);
}

export default App;