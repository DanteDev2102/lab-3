import type { AxiosResponse } from 'axios';
import type { IContactApi, IResponse } from '$lib/models/interfaces/api';
import type { IContact } from '$lib/models/interfaces/contact';

import { assignBearerToken, instance } from './instance';

export async function getContactById(
	id: number,
	token: string
): Promise<AxiosResponse<IResponse<IContactApi>>> {
	return await instance.get(`/client/contact/${id}`, {
		headers: {
			Authorization: assignBearerToken(token)
		}
	});
}

export async function getContacts(
	page: number,
	token: string
): Promise<AxiosResponse<IResponse<Omit<IContactApi, 'user'>[]>>> {
	return await instance.get(`/client/contact?page=${page}&page_size=10`, {
		headers: {
			Authorization: assignBearerToken(token)
		}
	});
}

export async function getContactsByAlias(
	alias: string,
	token: string
): Promise<AxiosResponse<IResponse<Omit<IContactApi, 'user'>[]>>> {
	return await instance.get(`/client/contact?alias=${alias}`, {
		headers: {
			Authorization: assignBearerToken(token)
		}
	});
}

export async function deleteContactById(
	id: number,
	token: string
): Promise<AxiosResponse<IResponse<Omit<IContactApi, 'user'>>>> {
	return await instance.delete(`/client/contact/${id}`, {
		headers: {
			Authorization: assignBearerToken(token)
		}
	});
}

export async function updateContact(
	token: string,
	{ id, ...rest }: Partial<IContact>
): Promise<AxiosResponse<IResponse<Omit<IContactApi, 'user'>>>> {
	return await instance.patch(`/client/contact/${id}`, rest, {
		headers: {
			Authorization: assignBearerToken(token)
		}
	});
}

export async function createContact(
	token: string,
	contact: Partial<IContact>
): Promise<AxiosResponse<IResponse<Omit<IContactApi, 'user'>>>> {
	return await instance.post(
		'/client/contact',
		{
			alias: contact.alias,
			description: contact.description,
			account_number: contact.accountNumber
		},
		{
			headers: { Authorization: assignBearerToken(token) }
		}
	);
}
