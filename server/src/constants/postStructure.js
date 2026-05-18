export const postSelect = {
	id: true,
	title: true,
	content: true,
	created_at: true,
	users: {
		select: {
			id: true,
			username: true,
		},
	},
};