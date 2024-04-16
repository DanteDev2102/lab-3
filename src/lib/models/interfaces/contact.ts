import type { IUser } from './user';

export interface IContact {
	accountNumber: string;
	alias: string;
	createdAt: string;
	description: string;
	id: number;
	user: IUser;
	updatedAt: string;
}
