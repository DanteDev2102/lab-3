import type { IMoveApi } from '$lib/models/interfaces/api';

export function formatMove({ account_number, created_at, updated_at, ...rest }: IMoveApi) {
	return {
		...rest,
		accountNumber: account_number,
		createdAt: created_at,
		updatedAt: updated_at
	};
}

export function formatMoves(moves: IMoveApi[]) {
	return moves.map(formatMove);
}
