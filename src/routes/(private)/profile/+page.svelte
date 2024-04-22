<script lang="ts">
	import type { PageData } from './$types';

	import Meta from '$lib/components/meta.svelte';

	export let data: PageData;
</script>

<p>
	{JSON.stringify(data, null, 4)}
</p>

<Meta title="Perfil" />
