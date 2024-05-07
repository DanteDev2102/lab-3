import type { PageServerLoad } from './$types';
import { getMoves, getSumEnterAndOutputsValuesInPeriod } from '$lib/services/bank/moves';
import { getBalance } from '$lib/services/bank/user';
import { formatMoves } from '$lib/formaters/moves';

export const prerender = false;

function getFirstDayOfMonth() {
	const now = new Date();
	return new Date(now.getFullYear(), now.getMonth(), 1);
}

export const load: PageServerLoad = async ({ locals }) => {
	const token: string = locals.user.accessToken;

	const { data } = await getBalance(token);

	const initDate = getFirstDayOfMonth().getTime();
	const finishDate = new Date().getTime();

	const { input, output } = await getSumEnterAndOutputsValuesInPeriod(token, initDate, finishDate);

	const { data: recentMoves } = await getMoves(token, 1, 10);

	return {
		balance: data.data.balance,
		inputs: input,
		outputs: output,
		recentMoves: await Promise.all(await formatMoves(recentMoves.data, token))
	};
};
