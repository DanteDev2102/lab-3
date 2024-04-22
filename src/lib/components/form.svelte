<script lang="ts">
	import InputWithIcon from './inputWithIcon.svelte';
	import { enhance } from '$app/forms';
	import type { IInput } from '$lib/models/interfaces/components';

	export let inputs: IInput[];
	export let buttonTitle: string;
	export let method: string;
	export let action: string;
	export let isUpdate: boolean = false;
	export let callback: <T>(result: T) => void = (result) => {};
	export let colorBtn: string = '33b786';
	export let colorFontBtn: string = 'ffffff';
</script>

<form
	class="space-y-6 w-full grid justify-center"
	use:enhance={() => {
		return ({ update, result }) => {
			callback(result);
			update({ reset: isUpdate });
		};
	}}
	{method}
	action={`?/${action}`}
>
	<div class="grid grid-cols-1 gap-3 content-center w-full">
		{#each inputs as input}
			<InputWithIcon
				type={input.type}
				title={input.title}
				icon={input.icon || ''}
				iconLeft={input.iconLeft || false}
				isRequired={input.isRequired}
				name={input.name}
				placeholder={input?.placeholder || ''}
				isCheck={false}
				handleChange={() => {}}
			/>
		{/each}
		<slot />
	</div>
	<button
		type="submit"
		class=" btn group relative w-full flex justify-center py-2 px-4 border border-transparent rounded-lg text-sm"
		style={`background-color: #${colorBtn}; color: #${colorFontBtn}; font-weigth: bold`}
	>
		{buttonTitle}
	</button>
</form>
