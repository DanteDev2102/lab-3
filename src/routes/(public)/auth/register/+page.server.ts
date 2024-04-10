import { extractDataForm } from '$lib/utils/form';
import { login, register } from '$lib/services/bank';

export const actions = {
	register: async ({ request, cookies }) => {
		try {
			const data = extractDataForm(await request.formData(), [
				'name',
				'lastname',
				'email',
				'password',
				'passwordConfirm',
				'vat',
				'birthdate',
				'phone'
			]);

			data['birthdate'] = `${data['birthdate']}T00:00:00.341364Z`;

			const { data: registerUser } = await register(data);

			const { data: authUser } = await login(registerUser.data.email, registerUser.data.password);

			cookies.set('access_token', authUser.data.jwt, { path: '/' });

			return { ok: true };
		} catch (error) {
			console.log(error);
			return { ok: false };
		}
	}
};
