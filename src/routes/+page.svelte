<script>
	import Footer from '$lib/components/footer.svelte';
	import Navbar from '$lib/components/navbar.svelte';
	import Presentation from '$lib/components/presentation.svelte';
	import Services from '$lib/components/services.svelte';
	import Meta from '$lib/components/meta.svelte';
</script>

<Meta title="Banco Universitario" />

<div class="overflow-hidden">
	<Navbar />
	<div class="mt-40">
		<Presentation />
		<Services />
		<Footer />
	</div>
</div>
