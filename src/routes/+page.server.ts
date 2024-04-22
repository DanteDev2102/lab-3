import { redirect } from '@sveltejs/kit';

export const actions = {
	logout: async function (event) {
		event.cookies.delete('access_token', { path: '/' });
		delete event.locals.user;
		redirect(302, '/');
	}
};
