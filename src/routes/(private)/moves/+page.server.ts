import type { PageServerLoad } from './$types';
import type { IMove } from '$lib/models/interfaces/move';
import { getMoves } from '$lib/services/bank';
import { redirect } from '@sveltejs/kit';
import { formatMoves } from '$lib/formaters/moves';

export const prerender = false;

export const load: PageServerLoad = async ({ cookies, locals }) => {
	const token = cookies.get('access_token');

	if (!token) {
		throw redirect(302, '/');
	}

	const { data } = await getMoves(token, 1);

	const moves = formatMoves(data.data);

	return {
		moves,
		user: locals.user,
		prevPage: null,
		nextPage: 2
	};
};

export const actions = {
	paginateMoves: async function ({ cookies, request }) {
		const dataForm = await request.formData();
		const token = cookies.get('access_token') as string;

		const page = +(dataForm.get('page') as string);

		const { data } = await getMoves(token, +page);

		const moves: IMove[] = formatMoves(data.data);

		return {
			nextPage: moves.length === 10 ? page + 1 : null,
			prevPage: page > 1 ? page - 1 : null,
			moves
		};
	}
};
