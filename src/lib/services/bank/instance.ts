import axios from 'axios';

export const instance = axios.create({ baseURL: 'http://localhost:3000/v1' });

export function assignBearerToken(token: string): string {
	return `Bearer ${token}`;
}
