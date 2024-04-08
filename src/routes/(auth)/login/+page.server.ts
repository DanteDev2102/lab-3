import { login } from '$lib/services/bank.js';

export const actions = {
	login: async ({ cookies, request }) => {
		try {
			const data = await request.formData();

			const email = data.get('email') || '';
			const password = data.get('password') || '';

			const { data: userData } = await login(email, password);

			cookies.set('access_token', userData.data.jwt, { path: '/' });

			return { isLoggedIn: true };
		} catch (error) {
			console.log(error);
			return { isLoggedIn: false };
		}
	}
};
