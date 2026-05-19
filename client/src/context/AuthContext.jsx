import {createContext, useContext, useEffect, useState} from "react";
import {getCurrentUser} from "../api/authApi";

const AuthContext = createContext();

export function AuthProvider({children})
{
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		checkAuth();
	}, []);

	async function checkAuth()
	{
		try
		{
			const res = await getCurrentUser();
			localStorage.setItem("accessToken", res.data.accessToken);
			setUser(res.data.user);
		}
		catch (error)
		{
			// user simply not logged in
			localStorage.removeItem("accessToken");
			setUser(null);
		}
		finally
		{
			setLoading(false);
		}
	}

	function logout()
	{
		localStorage.removeItem("accessToken");
		setUser(null);
	}

	return (
		<AuthContext.Provider
			value={{
				user,
				setUser,
				loading,
				logout,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth()
{
	return useContext(AuthContext);
}