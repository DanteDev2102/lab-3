import axios from 'axios';

const instance = axios.create({ baseURL: 'http://localhost:3000' });

function assignBearerToken(token: string) {
	return {
		Authorization: `Bearer ${token}`
	};
}

export async function login(email: string, password: string) {
	return await instance.post('/v1/public/client/user/login', { email, password });
}

export async function register(data) {
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

export async function getMoves(token: string, page: number, multiplier?: number | null) {
	return await instance.get(
		`/v1/client/movement?page=${page}&page_size=20${multiplier ? `&multiplier=${multiplier}` : ''}`,
		{ headers: assignBearerToken(token) }
	);
}
