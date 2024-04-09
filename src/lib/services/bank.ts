import axios from 'axios';

const instance = axios.create({ baseURL: 'http://localhost:3000' });

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
