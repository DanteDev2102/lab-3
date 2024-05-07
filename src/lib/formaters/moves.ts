import type { IMoveApi } from '$lib/models/interfaces/api';
import { getUserByAccountNumber } from '$lib/services/bank/user';

export async function formatMove(
	{ account_number, created_at, updated_at, ...rest }: IMoveApi,
	accessToken: string
) {
	try {
		const { data } = await getUserByAccountNumber(accessToken, account_number);
		return {
			...rest,
			accountNumber: `${data.data.first_name} ${data.data.last_name}`,
			createdAt: created_at,
			updatedAt: updated_at
		};
	} catch (error) {
		return {
			...rest,
			accountNumber: account_number,
			createdAt: created_at,
			updatedAt: updated_at
		};
	}
}

export async function formatMoves(moves: IMoveApi[], accessToken: string) {
	return moves.map(async (move) => await formatMove(move, accessToken));
}
