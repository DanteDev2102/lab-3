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

export async function getSumEnterAndOutputsValuesInPeriod(
	token: string,
	initDate: number,
	finishDate: number
) {
	let moves: IMoveApi[] = [] as IMoveApi[];
	let page: number = 1;

	const values: { input: number; output: number } = { input: 0, output: 0 };

	const { data } = await getMoves(token, page, 100);

	moves = data.data;

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

	assignValues(moves);

	while (moves.length % 100 === 0) {
		page++;
		const { data: dataPage } = await getMoves(token, page, 100);
		moves = dataPage.data;
		assignValues(moves);
	}

	return values;
}

export async function createPayment(
	token: string,
	amount: number,
	description: string,
	accountNumber: string
): Promise<AxiosResponse<IResponse<IMoveApi>>> {
	return await instance.post(
		'/client/movement/payment',
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
