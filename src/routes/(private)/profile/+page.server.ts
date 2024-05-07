import type { PageServerLoad } from './$types';
import type { Actions } from '@sveltejs/kit';
import { getMoves } from '$lib/services/bank/moves';
import { getBalance, changePassword } from '$lib/services/bank/user';
import { formatMoves } from '$lib/formaters/moves';
import { extractDataForm } from '$lib/utils/form';

export const prerender = false;

interface IChangePassword {
	oldPassword: string;
	newPassword: string;
	confirmPassword: string;
}

export const load: PageServerLoad = async ({ locals }) => {
	const token: string = locals.user.accessToken;

	const moves = (await getMoves(token, 1, 10)).data.data;

	const balance = (await getBalance(token)).data.data.balance;

	return {
		lastestMoves: await Promise.all(await formatMoves(moves, token)),
		balance
	};
};

export const actions: Actions = {
	changePassword: async ({ locals, request }) => {
		const token: string = locals.user.accessToken;

		const { confirmPassword, newPassword, oldPassword } = extractDataForm<IChangePassword>(
			await request.formData(),
			['oldPassword', 'newPassword', 'confirmPassword']
		);

		if (newPassword !== confirmPassword) {
			return {
				success: false,
				message: 'La nueva clave y el confirmar clave deben ser iguales'
			};
		}

		try {
			const { data } = await changePassword(token, oldPassword, newPassword);

			return {
				success: true,
				message: data.message
			};
		} catch (error) {
			return {
				success: false,
				message: error.response.data.message
			};
		}
	}
};
