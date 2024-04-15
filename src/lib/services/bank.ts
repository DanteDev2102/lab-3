import type {
	ILoginApi,
	IMoveApi,
	IResponse,
	IUserApi,
	IBalanceApi
} from '$lib/models/interfaces/api';
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
	pageSize: number = 10,
	multiplier?: number
): Promise<AxiosResponse<IResponse<IMoveApi[]>>> {
	return await instance.get(
		`/v1/client/movement?page=${page}&page_size=${pageSize}${multiplier ? `&multiplier=${multiplier}` : ''}`,
		{
			headers: {
				Authorization: assignBearerToken(token)
			}
		}
	);
}

export async function getSumEnterAndOutputsValuesInPeriod(
	token: string,
	mount: number[],
	year: number
) {
	let moves: IMoveApi[] = [] as IMoveApi[];
	let page: number = 1;

	const values: { input: number; output: number } = { input: 0, output: 0 };

	const { data } = await getMoves(token, page, 100);

	moves = data.data;

	const assignValues = (moves: IMoveApi[]): void => {
		moves
			.filter(({ created_at }: IMoveApi) => {
				const date = new Date(created_at);
				const periodYear = date.getFullYear();
				const periodMonth = date.getMonth();
				return year === periodYear && mount.includes(periodMonth);
			})
			.forEach(({ multiplier, amount }: IMoveApi) => {
				if (multiplier === 1) {
					values.input += amount;
					return;
				}

				values.output += amount;
				return;
			});
	};

	assignValues(moves);

	while (moves.length % 100 === 0) {
		page++;
		const { data: dataPage } = await getMoves(token, page, 100);
		moves = dataPage.data;
		assignValues(moves);
	}

	return values;
}

export async function whoIAm(token: string): Promise<AxiosResponse<IResponse<IUserApi>>> {
	return await instance.get('/v1/client/user/whoami', {
		headers: { Authorization: assignBearerToken(token) }
	});
}

export async function getBalance(token: string): Promise<AxiosResponse<IResponse<IBalanceApi>>> {
	return await instance.get('/v1/client/user/balance', {
		headers: { Authorization: assignBearerToken(token) }
	});
}

export async function getUserByAccountNumber(
	token: string,
	accountNumber: string
): Promise<AxiosResponse<IResponse<IUserApi>>> {
	return await instance.get(`/v1/client/user/account/${accountNumber}`, {
		headers: { Authorization: assignBearerToken(token) }
	});
}

export async function changePassword(
	token: string,
	password: string,
	newPassword: string
): Promise<AxiosResponse<IResponse<IUserApi>>> {
	return await instance.patch(
		'/v1/client/user/password',
		{ password, new_password: newPassword },
		{
			headers: { Authorization: assignBearerToken(token) }
		}
	);
}

export async function createPayment(
	token: string,
	amount: number,
	description: string,
	accountNumber: string
): Promise<AxiosResponse<IResponse<IMoveApi>>> {
	return await instance.post(
		'/v1/client/movement/payment',
		{
			amount,
			description,
			account_number: accountNumber
		},
		{
			headers: { Authorization: assignBearerToken(token) }
		}
	);
}
