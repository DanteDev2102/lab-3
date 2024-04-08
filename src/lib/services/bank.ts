import axios from 'axios';

const instance = axios.create({ baseURL: 'http://localhost:3000' });

export async function login(email: string, password: string) {
	return await instance.post('/v1/public/client/user/login', { email, password });
}

export async function register(data) {
	return await instance.post('/v1/public/client/user/register', data);
}
