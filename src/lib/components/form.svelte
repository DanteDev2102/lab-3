<script lang="ts">
	import type { SvelteComponent } from 'svelte';
	import InputWithIcon from './inputWithIcon.svelte';

	export let inputs: SvelteComponent[];
	export let buttonTitle: string;
</script>

<form class="space-y-6 w-full grid justify-center">
	<div class="grid grid-cols-1 gap-3 content-center w-full">
  		{#each inputs as input}
  		  <InputWithIcon 
  		    type={input.type}
  		    title={input.title}
  		    icon={input.icon}
  		    iconLeft={input.iconLeft}
  		    isRequired={input.isRequired}
  		  />
  		{/each}
	</div>
	<button
		type="button"
		class=" btn group relative w-full flex justify-center py-2 px-4 border border-transparent rounded-lg text-sm"
	>
		{buttonTitle}
	</button>
</form>

<style>
	button {
		background-color: #33b786;
		color: #ffffff;
		font-weight: bold;
	}
</style>
