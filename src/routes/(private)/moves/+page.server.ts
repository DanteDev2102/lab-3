import type { PageServerLoad, Actions } from './$types';
import type { ICreateMove, IMove } from '$lib/models/interfaces/move';

import { createPayment, getMoves } from '$lib/services/bank/moves';
import { formatMoves } from '$lib/formaters/moves';
import { extractDataForm } from '$lib/utils/form';
import { createContact } from '$lib/services/bank/contacts';

export const prerender = false;

export const load: PageServerLoad = async ({ locals }) => {
	const token = locals.user.accessToken;

	const { data } = await getMoves(token, 1);

	const moves = formatMoves(data.data);

	return {
		moves,
		user: locals.user,
		prevPage: null,
		nextPage: moves.length === 10 ? 2 : null
	};
};

export const actions: Actions = {
	paginateMoves: async function ({ request, locals }) {
		const page = +((await request.formData()).get('page') as string);

		const { data } = await getMoves(locals.user.accessToken, page);

		const moves: IMove[] = formatMoves(data.data);

		return {
			nextPage: moves.length === 10 ? page + 1 : null,
			prevPage: page > 1 ? page - 1 : null,
			moves
		};
	},
	pay: async function ({ request, locals }) {
		const token = locals.user.accessToken;

		const { accountNumber, amount, canAddContact, description, alias, descriptionContact } =
			extractDataForm<ICreateMove>(await request.formData(), [
				'accountNumber',
				'amount',
				'description',
				'canAddContact',
				'alias',
				'descriptionContact'
			]);

		try {
			const pay = await createPayment(token, parseFloat(amount), description, accountNumber);

			if (canAddContact) {
				await createContact(token, {
					accountNumber,
					alias,
					description: descriptionContact
				});
			}

			return {
				pay: pay.data.data,
				errors: pay.data.errors,
				success: true
			};
		} catch (error) {
			return {
				pay: {},
				errors: error.response.data.errors,
				success: false
			};
		}
	}
};
