import type { ILoginApi, IResponse, IUserApi, IBalanceApi } from '$lib/models/interfaces/api';
import type { IRegisterUser } from '$lib/models/interfaces/user';
import type { AxiosResponse } from 'axios';

import { instance, assignBearerToken } from './instance';

export async function login(
	email: string,
	password: string
): Promise<AxiosResponse<IResponse<ILoginApi>>> {
	return await instance.post('/public/client/user/login', { email, password });
}

export async function register(data: IRegisterUser): Promise<AxiosResponse<IResponse<IUserApi>>> {
	return await instance.post('/public/client/user/register', {
		first_name: data.name,
		last_name: data.lastname,
		document_number: data.vat,
		birth_date: data.birthdate,
		phone_number: data.phone,
		email: data.email,
		password: data.password
	});
}

export async function whoIAm(token: string): Promise<AxiosResponse<IResponse<IUserApi>>> {
	return await instance.get('/client/user/whoami', {
		headers: { Authorization: assignBearerToken(token) }
	});
}

export async function getBalance(token: string): Promise<AxiosResponse<IResponse<IBalanceApi>>> {
	return await instance.get('/client/user/balance', {
		headers: { Authorization: assignBearerToken(token) }
	});
}

export async function getUserByAccountNumber(
	token: string,
	accountNumber: string
): Promise<AxiosResponse<IResponse<IUserApi>>> {
	return await instance.get(`/client/user/account/${accountNumber}`, {
		headers: { Authorization: assignBearerToken(token) }
	});
}

export async function changePassword(
	token: string,
	password: string,
	newPassword: string
): Promise<AxiosResponse<IResponse<IUserApi>>> {
	return await instance.patch(
		'/client/user/password',
		{ password, new_password: newPassword },
		{
			headers: { Authorization: assignBearerToken(token) }
		}
	);
}
