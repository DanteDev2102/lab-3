export interface IUser {
	name: string;
	lastname: string;
	email: string;
	vat: string;
	birthdate: string;
	phone: string;
	account: string;
	balance: number;
	accessToken: string;
}

export interface IRegisterUser extends Omit<IUser, 'balance' | 'accessToken'> {
	password: string;
	passwordConfirm: string;
}

export interface ILogin {
	email: string;
	password: string;
}
