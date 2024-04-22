export interface IInput {
	type: string;
	title: string;
	isRequired: boolean;
	name: string;
	icon?: string;
	iconLeft?: boolean;
	placeholder?: string;
	isCheck?: boolean;
	handleChange?: (e) => void;
}