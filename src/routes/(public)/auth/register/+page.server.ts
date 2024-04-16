import { AxiosError } from 'axios';
import { extractDataForm } from '$lib/utils/form';
import { login, register } from '$lib/services/bank/user';
import type { IRegisterUser } from '$lib/models/interfaces/user';

export const actions = {
	register: async ({ request, cookies }) => {
		try {
			const data = extractDataForm<IRegisterUser>(await request.formData(), [
				'name',
				'lastname',
				'email',
				'password',
				'passwordConfirm',
				'vat',
				'birthdate',
				'phone'
			]);

			if (data.password !== data.passwordConfirm) {
				return {
					isLoggedIn: false,
					message: 'las contraseñas deben ser iguales',
					errors: [{ error: 'las contraseñas deben ser iguales' }]
				};
			}

			data['birthdate'] = `${data['birthdate']}T00:00:00.341364Z`;

			const { data: registerUser } = await register(data);

			const { data: authUser } = await login(registerUser.data.email, data.password);

			cookies.set('access_token', authUser.data.jwt, { path: '/' });

			return {
				isLoggedIn: !authUser.data?.jwt,
				message: authUser.message,
				errors: authUser.errors
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
				isLoggedIn: false,
				message: 'Ha ocurrido un error inesperado, intente mas tarde.',
				errors: [{ error: 'Ha ocurrido un error inesperado, intente mas tarde.' }]
			};
		}
	}
};
