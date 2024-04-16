import type { PageServerLoad } from './$types';

import { redirect } from '@sveltejs/kit';
import { getContacts } from '$lib/services/bank/contacts';

export const prerender = false;

export const load: PageServerLoad = async ({ cookies }) => {
	const token = cookies.get('access_token') as string;

	if (!token) {
		throw redirect(302, '/');
	}

	const contacts = (await getContacts(1, token)).data.data;

	return {
		contacts,
		nextPage: contacts.length === 10 ? 2 : null,
		prevPage: null
	};
};
