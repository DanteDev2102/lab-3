import type { AxiosResponse } from 'axios';
import type { IMoveApi, IResponse } from '$lib/models/interfaces/api';

import { instance, assignBearerToken } from './instance';

export async function getMoves(
	token: string,
	page: number,
	pageSize: number = 10,
	multiplier?: number
): Promise<AxiosResponse<IResponse<IMoveApi[]>>> {
	return await instance.get(
		`/client/movement?page=${page}&page_size=${pageSize}${multiplier ? `&multiplier=${multiplier}` : ''}`,
		{
			headers: {
				Authorization: assignBearerToken(token)
			}
		}
	);
}

export async function getAllMoves(token: string): Promise<AxiosResponse<IResponse<IMoveApi[]>>> {
	return await instance.get('/client/movement', {
		headers: {
			Authorization: assignBearerToken(token)
		}
	});
}

export async function getSumEnterAndOutputsValuesInPeriod(
	token: string,
	initDate: number,
	finishDate: number
) {
	const values: { input: number; output: number } = { input: 0, output: 0 };

	const { data } = await getAllMoves(token);

	const assignValues = (moves: IMoveApi[]): void => {
		moves
			.filter(({ created_at }: IMoveApi) => {
				const date = new Date(created_at).getTime();
				return initDate <= date && finishDate >= date;
			})
			.forEach(({ multiplier, amount }: IMoveApi) => {
				if (multiplier === 1) {
					values.input += amount;
					return;
				}

				values.output += amount;
			});
	};

	assignValues(data.data);

	return values;
}

export async function createPayment(
	token: string,
	amount: number,
	description: string,
	accountNumber: string
): Promise<AxiosResponse<IResponse<IMoveApi>>> {
	return await instance.post(
		'/client/movement',
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
