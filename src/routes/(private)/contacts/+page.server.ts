import type { PageServerLoad, Actions } from './$types';
import { deleteContactById, getContacts, getContactsByAlias } from '$lib/services/bank/contacts';
import { formatContacts } from '$lib/formaters/contacts';

export const prerender = false;

export const load: PageServerLoad = async ({ locals }) => {
	const token: string = locals.user.accessToken;

	const contacts = (await getContacts(1, token)).data.data;

	return {
		contacts: formatContacts(contacts),
		nextPage: contacts.length === 10 ? 2 : null,
		prevPage: null
	};
};

export const actions: Actions = {
	paginateContacts: async ({ locals, request }) => {
		const token: string = locals.user.accessToken;
		const page: number = +((await request.formData()).get('page') as string);

		const contacts = (await getContacts(page, token)).data.data;

		return {
			contacts: formatContacts(contacts),
			nextPage: contacts.length === 10 ? page + 1 : null,
			prevPage: page === 1 ? null : page - 1
		};
	},
	searchContactsWithAlias: async ({ request, locals }) => {
		const token: string = locals.user.accessToken;
		const alias: string = (await request.formData()).get('alias') as string;

		const contacts = (await getContactsByAlias(alias, token)).data.data;

		return {
			contacts: formatContacts(contacts)
		};
	},
	deleteContact: async ({ request, locals }) => {
		const token: string = locals.user.accessToken;
		const id: number = +((await request.formData()).get('id') as string);

		await deleteContactById(id, token);
	}
};
