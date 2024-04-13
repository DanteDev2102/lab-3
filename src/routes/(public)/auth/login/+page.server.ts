import { formatUser } from '$lib/formaters/user.js';
import { login } from '$lib/services/bank.js';
import { setUser } from '$lib/stores/user';
import { extractDataForm } from '$lib/utils/form';
import { AxiosError } from 'axios';

interface ILogin {
	email: string;
	password: string;
}

export const actions = {
	login: async ({ cookies, request }) => {
		try {
			const { email, password } = extractDataForm<ILogin>(await request.formData(), [
				'email',
				'password'
			]);

			const { data: userData } = await login(email, password);

			if (userData.data.jwt) {
				cookies.set('access_token', userData.data.jwt, { path: '/' });
			}

			return {
				isLoggedIn: !!userData.data?.jwt,
				message: userData.message,
				errors: userData.errors
			};
		} catch (error) {
			if (error instanceof AxiosError) {
				return {
					isLoggedIn: false,
					message: error?.response?.data.message,
					errors: error?.response?.data.errors
				};
			}

			return {
				isLoggedIn: true,
				message: 'Ha ocurrido un error inesperado, intente mas tarde.',
				errors: [{ error: 'Ha ocurrido un error inesperado, intente mas tarde.' }]
			};
		}
	}
};
