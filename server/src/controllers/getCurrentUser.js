export async function getCurrentUser(req, res)
{
	const {id, username} = req.user

	return res.status(200).json({
		success: true,
		user: {
			id: id,
			username: username,
		},
	});
}