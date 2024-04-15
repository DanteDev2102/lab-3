<script lang="ts">
	import type { PageData } from "./$types";

    export let data: PageData;

</script>

<h1>contacts</h1>

<p>
    {JSON.stringify(data, null, 4)}
</p>