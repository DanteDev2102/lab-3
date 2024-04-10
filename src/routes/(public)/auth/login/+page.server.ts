import { login } from '$lib/services/bank.js';
import { extractDataForm } from '$lib/utils/form.ts';

export const actions = {
	login: async ({ cookies, request }) => {
		try {
			const { email, password } = extractDataForm(await request.formData(), ['email', 'password']);

			const { data: userData } = await login(email, password);

			if (userData.data.jwt) {
				cookies.set('access_token', userData.data.jwt, { path: '/' });
			}

			return {
				isLoggedIn: true,
				message: userData.message,
				errors: userData.errors
			};
		} catch (error) {
			console.log(error);
			return { isLoggedIn: false };
		}
	}
};
