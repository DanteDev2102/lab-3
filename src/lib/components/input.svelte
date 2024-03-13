<script lang="ts">
	export let type: string;
	export let title: string;
	export let isRequired: boolean;
</script>

<input {type} placeholder={`ingrese su ${title}`} required={isRequired} class="w-fit" />
