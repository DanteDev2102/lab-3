<script lang="ts">
	import type { PageServerData } from './$types';

	export let data: PageServerData;
</script>

<h1>moves</h1>
<p>{JSON.stringify(data)}</p>
