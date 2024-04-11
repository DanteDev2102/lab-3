export interface IError {
	error: string;
}

export interface IResponse<T> {
	errors: IError[];
	data: T;
	message: string;
}

export interface IMoveApi {
	account_number: string;
	amount: number;
	balance: number;
	created_at: string;
	description: string;
	id: number;
	multiplier: 1 | -1;
	updated_at: string;
}

export interface IUserApi {
	account_number: string;
	birth_date: string;
	document_number: string;
	email: string;
	first_name: string;
	last_name: string;
	phone_number: string;
}

export interface ILoginApi extends IUserApi {
	jwt: string;
}
