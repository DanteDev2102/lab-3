<script lang="ts">
	export let type: string;
	export let isRequired: boolean;
	export let name: string;
	export let placeholder: string = '';
	export let isCheck: boolean = false;
	export let handleChange: (e) => void = (e) => {};
</script>

{#if type === 'checkbox'}
	<input type="checkbox" class="checkbox" {name} bind:checked={isCheck} on:change={handleChange} />
{:else}
	<input {type} required={isRequired} class="w-screen text-xs" {name} {placeholder} />
{/if}
