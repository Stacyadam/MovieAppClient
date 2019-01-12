export const resolvers = {
	Mutation: {
		logout: (_, variables, { cache, client }) => {
			localStorage.removeItem('token');
			cache.writeData({ data: { user: null } });
			window.location.reload(false);
			return null;
		}
	}
};
