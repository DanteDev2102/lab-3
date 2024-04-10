import { writable } from 'svelte/store';

const initialState = {};

export const userStore = writable(initialState);

export function setUser(user) {
	userStore.set(user);
}

export function resetUser() {
	userStore.set(initialState);
}

export function updateUser(data) {
	userStore.update((user) => ({ ...userStore, ...data }));
}
