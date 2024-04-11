<script>
	import Logo from './logo.svelte';
</script>

<header class="w-full h-44 flex flex-row fixed start-0 top-0 text-2xl z-50">
	<nav class="grid grid-cols-2 grid-rows-1 gap-32">
		<Logo />
		<div class="h-full grid grid-cols-4 grid-rows-1 items-center">
			<a href="/about">Nosotros</a>
			<a href="/contact">Contactanos</a>
			<a href="/auth/login" class="btn btn-outline btn-accent btn-lg btn-wide text-2xl btn-bank">
				Banca en linea
			</a>
		</div>
	</nav>
</header>

<style>
	header {
		background-color: #d4f3e7;
	}
</style>
