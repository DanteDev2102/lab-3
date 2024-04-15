import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getBalance, getMoves, getSumEnterAndOutputsValuesInPeriod } from '$lib/services/bank';
import { formatMoves } from '$lib/formaters/moves';

export const prerender = false;

export const load: PageServerLoad = async ({ cookies }) => {
	const token = cookies.get('access_token');

	if (!token) {
		throw redirect(302, '/');
	}

	const { data } = await getBalance(token);

	const { input, output } = await getSumEnterAndOutputsValuesInPeriod(token, [1, 3], 2024);

	const { data: recentMoves } = await getMoves(token, 1, 5);

	return {
		balance: data.data.balance,
		inputs: input,
		outputs: output,
		recentMoves: formatMoves(recentMoves.data)
	};
};
