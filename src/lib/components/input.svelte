<script lang="ts">
	export let type: string;
	export let isRequired: boolean;
	export let name: string;
	export let placeholder: string = '';
	export let isCheck: boolean = false;
	export let handleChange: (e: Event) => void = (e) => {};
	export let value: string = '';

	let valueInput = value;
</script>

{#if type === 'checkbox'}
	<input type="checkbox" class="checkbox" {name} bind:checked={isCheck} on:change={handleChange} />
{:else if type === 'text'}
	<input
		type="text"
		required={isRequired}
		class="w-screen text-xs"
		{name}
		{placeholder}
		bind:value={valueInput}
	/>
{:else}
	<input {type} class="w-screen text-xs" required={isRequired} {name} {placeholder} />
{/if}
