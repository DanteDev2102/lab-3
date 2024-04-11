import type { IUserApi } from '$lib/models/interfaces/api';
import type { IUser } from '$lib/models/interfaces/user';

export function formatUser(user: IUserApi): IUser {
	return {
		birthdate: user.birth_date,
		email: user.email,
		lastname: user.last_name,
		name: user.first_name,
		phone: user.phone_number,
		vat: user.document_number
	};
}
