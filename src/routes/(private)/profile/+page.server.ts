import type { PageServerLoad } from './$types';
import { getMoves } from '$lib/services/bank/moves';
import { getBalance } from '$lib/services/bank/user';

export const prerender = false;

export const load: PageServerLoad = async ({ locals }) => {
	const token: string = locals.user.accessToken;

	const moves = (await getMoves(token, 1, 5)).data.data;

	const balance = (await getBalance(token)).data.data.balance;

	return {
		lastestMoves: moves,
		balance
	};
};
