export interface IUser {
	name: string;
	lastname: string;
	email: string;
	vat: string;
	birthdate: string;
	phone: string;
}

export interface IRegisterUser extends IUser {
	password: string;
	passwordConfirm: string;
}
