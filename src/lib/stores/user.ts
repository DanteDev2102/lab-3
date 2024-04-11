import type { IUser } from '$lib/models/interfaces/user';
import { writable } from 'svelte/store';

const initialState: IUser = {
	birthdate: '',
	email: '',
	lastname: '',
	name: '',
	phone: '',
	vat: ''
};

export const userStore = writable(initialState);

export function setUser(user: IUser): void {
	userStore.set(user);
}

export function resetUser(): void {
	userStore.set(initialState);
}

export function updateUser(data: Partial<IUser>): void {
	userStore.update((user: IUser) => ({ ...user, ...data }));
}
