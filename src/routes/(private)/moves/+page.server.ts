import { getMoves } from '$lib/services/bank';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies, locals }) => {
	const token = cookies.get('access_token');

	if (!token) {
		throw redirect(302, '/');
	}
	const fetchMoves = await getMoves(token, 1, null);

	return {
		...fetchMoves.data,
		user: {
			...locals.user
		}
	};
};

export const actions = {
	logout: async function ({ cookies }) {
		cookies.delete('access_token', { path: '/' });

		redirect(302, '/');
	}
};
