<script lang="ts">
	export let type: string;
	export let title: string;
	export let isRequired: boolean;
	export let name: string;
</script>

<input
	{type}
	placeholder={`ingrese su ${title}`}
	required={isRequired}
	class="w-screen text-sm"
	{name}
/>
