import { getMoves } from '$lib/services/bank';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { formatMoves } from '$lib/formaters/moves';

export const load: PageServerLoad = async ({ cookies, locals }) => {
	const token = cookies.get('access_token');

	if (!token) {
		throw redirect(302, '/');
	}
	const { data } = await getMoves(token, 1, null);

	const moves = formatMoves(data.data);

	return {
		moves,
		user: locals.user
	};
};

export const actions = {
	logout: async function ({ cookies }) {
		cookies.delete('access_token', { path: '/' });

		redirect(302, '/');
	},
	paginateMoves: async function ({ cookies, request }) {
		const dataForm = await request.formData();
		const token = cookies.get('access_token') as string;

		const page = +(dataForm.get('page') as string);

		const { data } = await getMoves(token, +page);

		const moves = formatMoves(data.data);

		console.log(moves);

		return {
			page,
			nextPage: page + 1,
			prevPage: page - 1,
			moves
		};
	}
};
