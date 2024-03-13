<script lang="ts">
	import Icon from '@iconify/svelte';
	import Input from './input.svelte';

	export let type: string;
	export let title: string;
	export let icon: string;
	export let iconLeft: boolean;
	export let isRequired: boolean;

	const baseProps = { type, title, isRequired };
</script>

<!-- svelte-ignore a11y-label-has-associated-control -->
<label class="form-control w-96">
	<div class="label">
		<strong>
			<span class="label-text">{title}</span>
		</strong>
	</div>
	<div class="input input-bordered flex items-center gap-2">
		{#if iconLeft}
			<Icon inline={true} class="w-96 h-4 ml-28" {icon} />
			<Input {...baseProps} />
		{:else}
			<Input {...baseProps} />
			<Icon inline={true} class="w-96 h-4 ml-28" {icon} />
		{/if}
	</div>
</label>

<style>
	.input {
		background-color: #ffffff;
	}
</style>
