<script>
	import Navbar from '$lib/components/navbar.svelte';
	import Presentation from '$lib/components/presentation.svelte';
	import Services from '$lib/components/services.svelte';
</script>

<div class="overflow-hidden">
	<Navbar />
	<div class="mt-44 relative z-10">
		<Presentation />
		<Services />
	</div>
</div>
