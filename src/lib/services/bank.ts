import type { ILoginApi, IMoveApi, IResponse, IUserApi } from '$lib/models/interfaces/api';
import type { IRegisterUser } from '$lib/models/interfaces/user';
import axios, { type AxiosResponse } from 'axios';

const instance = axios.create({ baseURL: 'http://localhost:3000' });

function assignBearerToken(token: string): string {
	return `Bearer ${token}`;
}

export async function login(
	email: string,
	password: string
): Promise<AxiosResponse<IResponse<ILoginApi>>> {
	return await instance.post('/v1/public/client/user/login', { email, password });
}

export async function register(data: IRegisterUser): Promise<AxiosResponse<IResponse<IUserApi>>> {
	return await instance.post('/v1/public/client/user/register', {
		first_name: data.name,
		last_name: data.lastname,
		document_number: data.vat,
		birth_date: data.birthdate,
		phone_number: data.phone,
		email: data.email,
		password: data.password
	});
}

export async function getMoves(
	token: string,
	page: number,
	multiplier?: number | null
): Promise<AxiosResponse<IResponse<IMoveApi[]>>> {
	return await instance.get(
		`/v1/client/movement?page=${page}&page_size=20${multiplier ? `&multiplier=${multiplier}` : ''}`,
		{
			headers: {
				Authorization: assignBearerToken(token)
			}
		}
	);
}

export async function whoIAm(token: string) {
	return await instance.get('/v1/client/user/whoami', {
		headers: { Authorization: assignBearerToken(token) }
	});
}
