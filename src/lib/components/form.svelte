<script lang="ts">
	import type { SvelteComponent } from 'svelte';
	import InputWithIcon from './inputWithIcon.svelte';

	export let inputs: SvelteComponent[];
	export let Header: SvelteComponent | null;
	export let Footer: SvelteComponent | null;
	export let buttonTitle: string;
</script>

<form class="mt-8 space-y-6 w-full grid justify-center">
	{#if Header}
		<Header />
	{/if}
	{#each inputs as input}
		<InputWithIcon {...input} />
	{/each}
	<button
		type="button"
		class="group relative w-full flex justify-center py-2 px-4 border border-transparent rounded-lg text-sm"
	>
		{buttonTitle}
	</button>
	{#if Footer}
		<Footer />
	{/if}
</form>

<style>
	button {
		background-color: #33b786;
		color: #ffffff;
		font-weight: bold;
	}
</style>
