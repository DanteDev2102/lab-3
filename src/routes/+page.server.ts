import { redirect } from '@sveltejs/kit';

export const actions = {
	logout: async function ({ cookies }) {
		cookies.delete('access_token', { path: '/' });
		redirect(302, '/');
	}
};
