<script lang="ts">
	import Logo from '$lib/components/logo.svelte';
	import { userStore, resetUser, setUser } from '$lib/stores/user';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	setUser(data.user);

	function logout() {
		resetUser();
	}
</script>

<div class="bg-default h-screen w-full">
	<div class="navbar bg-default">
		<div class="navbar-start">
			<Logo />
		</div>
		<div class="navbar-center hidden lg:flex pl-16 pt-14">
			<div class="flex flex-col-inverse">
				<h2 class="text-3xl font-bold mr-5">Mi Cuenta</h2>
				<span class="text-3xl font-bold">{$userStore.account}</span>
			</div>
		</div>
		<div class="navbar-end mr-6">
			<div class="avatar placeholder">
				<div class="bg-neutral text-neutral-content rounded-full w-16">
					<span class="text-3xl">{`${$userStore.name[0]}${$userStore.lastname[0]}`}</span>
				</div>
			</div>
		</div>
	</div>

	<div class="grid grid-cols-4 mx-10">
		<div class="h-full w-full grid grid-cols-1 gap-96 pt-7 ml-10">
			<div class="grid grid-cols-1 gap-8">
				<a class="text-xl" href="/main">Vista Previa</a>
				<a class="text-xl" href="/moves">Transferencias</a>
				<a class="text-xl" href="/contacts">Contactos</a>
				<a class="text-xl" href="/profile">Perfil</a>
			</div>
			<form method="POST" action="/?/logout">
				<button class="btn btn-outline" on:click={logout}>Cerrar Sesion</button>
			</form>
		</div>

		<slot />
	</div>
</div>
