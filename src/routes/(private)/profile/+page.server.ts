import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getMoves } from '$lib/services/bank/moves';
import { getBalance } from '$lib/services/bank/user';

export const prerender = false;

export const load: PageServerLoad = async ({ cookies }) => {
	const token = cookies.get('access_token') as string;

	if (!token) {
		throw redirect(302, '/');
	}

	const moves = (await getMoves(token, 1, 5)).data.data;

	const balance = (await getBalance(token)).data.data.balance;

	return {
		lastestMoves: moves,
		balance
	};
};
