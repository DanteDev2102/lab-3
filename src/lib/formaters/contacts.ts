import type { IContactApi } from '$lib/models/interfaces/api';
import type { IContact } from '$lib/models/interfaces/contact';
import { formatUser } from './user';

export function formatContact(
	contact: IContactApi | Omit<IContactApi, 'user'>
): Omit<IContact, 'user'> {
	return {
		id: contact.id,
		alias: contact.alias,
		accountNumber: contact.account_number,
		description: contact.description,
		createdAt: contact.created_at,
		updatedAt: contact.updated_at
	};
}

export function formatContacts(
	contacts: IContactApi[] | Omit<IContactApi, 'user'>[]
): Omit<IContact, 'user'>[] {
	return contacts.map(formatContact);
}

export function formatContactWithUser(contact: IContactApi): IContact {
	return {
		...formatContact(contact),
		user: formatUser(contact.user)
	};
}
