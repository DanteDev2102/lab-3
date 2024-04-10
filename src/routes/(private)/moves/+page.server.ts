import { getMoves } from '$lib/services/bank';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
	const fetchMoves = await getMoves(cookies.get('access_token') as string, 1, null);

	return {
		...fetchMoves.data
	};
};
