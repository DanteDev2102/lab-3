import type { IUserApi } from '$lib/models/interfaces/api';
import type { IUser } from '$lib/models/interfaces/user';

interface IParams {
	access_token?: string;
	balance?: number;
}

export function formatUser(user: IUserApi & IParams): IUser | Partial<IUser> {
	return {
		birthdate: new Date(user.birth_date).toLocaleDateString(
			{ language: 've-ES' },
			{ month: '2-digit', day: '2-digit', year: 'numeric' }
		),
		email: user.email,
		lastname: user.last_name,
		name: user.first_name,
		phone: user.phone_number,
		vat: user.document_number,
		account: user.account_number,
		accessToken: user.access_token,
		balance: user.balance
	};
}
