<script lang="ts">
	import type { PageData } from './$types';

	import Meta from '$lib/components/meta.svelte';

	export let data: PageData;
</script>

<p>
	{JSON.stringify(data.user, null, 4)}
</p>

<p>
	{JSON.stringify(data.inputs)}
	{JSON.stringify(data.outputs)}
</p>

<p>
	{JSON.stringify(data.recentMoves, null, 2)}
</p>

<Meta title="Banco Universitario" />
