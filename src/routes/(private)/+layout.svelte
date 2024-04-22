<script lang="ts">
	import { enhance } from '$app/forms';
	import Logo from '$lib/components/logo.svelte';
	import Icon from '@iconify/svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	const { user } = data;
</script>

<div class="bg-default h-screen w-full">
	<div class="navbar bg-default">
		<div class="navbar-start">
			<Logo />
		</div>
		<div class="navbar-center hidden lg:flex pl-16 pt-14">
			<div class="flex flex-col-inverse">
				<h2 class="text-3xl font-bold mr-5">Mi Cuenta</h2>
				<span class="text-3xl font-bold">{user.account}</span>
			</div>

			<div class="mx-7 flex flex-col-inverse">
				<h2 class="text-3xl font-bold mr-5">Mi Saldo</h2>
				<span class="text-3xl font-bold">{user.balance.toLocaleString()} Bs</span>
			</div>
			<button on:click={() => location.reload()}>
				<Icon icon="pepicons-print:arrow-spin-circle-filled" width="2rem" height="2rem" />
			</button>
			
		</div>
		<div class="navbar-end mr-6">
			<div class="avatar placeholder">
				<div class="bg-neutral text-neutral-content rounded-full w-16">
					<a class="text-3xl" href="/profile">{`${user.name[0]}${user.lastname[0]}`}</a>
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
			<form
				method="POST"
				action="/?/logout"
				use:enhance={() => {
					return ({ update }) => {
						return update({ reset: true });
					};
				}}
			>
				<button class="btn btn-outline">Cerrar Sesion</button>
			</form>
		</div>

		<slot />
	</div>
</div>
