export function extractDataForm<T>(formData: FormData, fields: string[]): T {
	let obj: T = {} as T;

	fields.forEach((field: string) => {
		obj = { ...obj, [field]: formData.get(field) };
	});

	return obj;
}
