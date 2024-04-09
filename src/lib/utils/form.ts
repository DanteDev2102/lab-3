export function extractDataForm(formData: FormData, fields: string[]) {
	let obj = {};

	fields.forEach((field: string) => {
		obj = { ...obj, [field]: formData.get(field) };
	});

	return obj;
}
