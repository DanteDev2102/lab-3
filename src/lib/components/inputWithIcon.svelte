<script lang="ts">
	import Icon from '@iconify/svelte';
	import Input from './input.svelte';

	export let type: string;
	export let title: string;
	export let icon: string;
	export let iconLeft: boolean;
	export let isRequired: boolean;
	export let name: string;
	export let placeholder: string;
	export let isCheck: boolean;
	export let handleChange: (e) => void;
	export let value: string = '';

	const baseProps = { type, placeholder, isRequired, name, value };
</script>

<!-- svelte-ignore a11y-label-has-associated-control -->

{#if type === 'checkbox'}
	<div class="form-control w-96 mt-3">
		<label class="label cursor-pointer flex justify-start gap-4">
			<strong>
				<span class="label-text">{title}</span>
			</strong>
			<Input {...baseProps} {isCheck} {handleChange} />
		</label>
	</div>
{:else}
	<label class="form-control w-96">
		<div class="label">
			<strong>
				<span class="label-text">{title}</span>
			</strong>
		</div>
		<div class="input input-bordered flex items-center gap-2">
			{#if iconLeft}
				<Icon inline={true} class="w-96 h-4 ml-44" {icon} />
				<Input {...baseProps} />
			{:else}
				<Input {...baseProps} />
				<Icon inline={true} class="w-96 h-4 ml-44" {icon} />
			{/if}
		</div>
	</label>
{/if}

<style>
	.input {
		background-color: #ffffff;
	}
</style>
