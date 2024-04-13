<script lang="ts">
	export let type: string;
	export let title: string;
	export let isRequired: boolean;
	export let name: string;
</script>

<input
	{type}
	placeholder={`Ingrese su ${title}`}
	required={isRequired}
	class="w-screen text-xs"
	{name}
/>
