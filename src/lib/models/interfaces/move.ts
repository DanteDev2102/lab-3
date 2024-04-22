export interface IMove {
	accountNumber: string;
	amount: number;
	balance: number;
	createdAt: string;
	description: string;
	id: number;
	multiplier: 1 | -1;
	updatedAt: string;
}

export interface ICreateMove {
	accountNumber: string;
	amount: string;
	description: string;
	canAddContact: boolean;
	alias?: string;
	descriptionContact?: string;
}
