import type { PageServerLoad } from './$types';
import { getMoves, getSumEnterAndOutputsValuesInPeriod } from '$lib/services/bank/moves';
import { getBalance } from '$lib/services/bank/user';
import { formatMoves } from '$lib/formaters/moves';

export const prerender = false;

export const load: PageServerLoad = async ({ locals }) => {
	const token: string = locals.user.accessToken;

	const { data } = await getBalance(token);

	const initDate = new Date('2024-01-01').getTime();
	const finishDate = new Date('2024-09-01').getTime();

	const { input, output } = await getSumEnterAndOutputsValuesInPeriod(token, initDate, finishDate);

	const { data: recentMoves } = await getMoves(token, 1, 5);

	return {
		balance: data.data.balance,
		inputs: input,
		outputs: output,
		recentMoves: formatMoves(recentMoves.data)
	};
};
