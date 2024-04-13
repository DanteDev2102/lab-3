<script lang="ts">
	import { enhance } from '$app/forms';
	import Logo from '$lib/components/logo.svelte';
	import Meta from '$lib/components/meta.svelte';
	import { setUser, userStore, resetUser } from '$lib/stores/user';
	import type { ActionData, PageServerData } from './$types';

	export let data: PageServerData;

	let page: number = 1;

	let moves = data.moves;

	function incrementPage() {
		if (moves.length === 10) page++;
	}

	function decrementPage() {
		if (page > 1) page--;
	}

	function logout() {
		resetUser();
	}

	setUser(data.user);
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
				<a class="text-xl" href="/">Vista Previa</a>
				<a class="text-xl" href="/">Cuentas</a>
				<a class="text-xl" href="/">Transferencias</a>
				<a class="text-xl" href="/">Contactos</a>
				<a class="text-xl" href="/">Perfil</a>
			</div>
			<form method="POST" action="?/logout">
				<button class="btn btn-outline" on:click={logout}>Cerrar Sesion</button>
			</form>
		</div>

		<div class="col-span-3">
			<h1 class="text-xl font-bold">Transferencias</h1>

			<div class="w-full flex justify-around">
				<div class="w-28">
					<form
						class="join grid grid-cols-3"
						method="POST"
						action="?/paginateMoves"
						use:enhance={() => {
							return async ({ result }) => {
								const { data } = result;

								moves = data.moves;

								page = data.page;
							};
						}}
					>
						<button
							class="join-item btn btn-outline hover:bg-inherit hover:text-black"
							on:click={decrementPage}
							type="submit"
						>
							&#60
						</button>
						<input
							readonly
							type="text"
							name="page"
							bind:value={page}
							class="input input-bordered px-2 text-center bg-inherit hover:bg-inherit hover:text-black text-black"
						/>
						<button
							class="join-item btn btn-outline hover:bg-inherit hover:text-black"
							on:click={incrementPage}
							type="submit"
						>
							&#62
						</button>
					</form>
				</div>
				<button class="btn btn-primary text-white">Realizar <br />Transferencia</button>
			</div>

			<div class="overflow-x-auto container">
				<table class="table">
					<thead>
						<tr class="text-lg">
							<th></th>
							<th>Nro Cuenta</th>
							<th>Descripcion</th>
							<th>Fecha</th>
							<th>Monto</th>
						</tr>
					</thead>
					<tbody>
						{#each moves as move}
							<tr>
								{#if move.multiplier === 1}
									<td>
										<img src="/add.png" alt="add" />
									</td>
									<td>{move.accountNumber}</td>
									<td>{move.description}</td>
									<td>{new Date(move.createdAt).toLocaleString()}</td>
									<td class="text-green-600 font-bold text-xl"
										>+{move.amount.toLocaleString('es-ES')} BS</td
									>
								{:else if move.multiplier === -1}
									<td>
										<img src="/subtract.svg" alt="substract" />
									</td>
									<td>{move.accountNumber}</td>
									<td>{move.description}</td>
									<td>{new Date(move.createdAt).toLocaleString()}</td>
									<td class="text-red-600 font-bold text-xl"
										>-{move.amount.toLocaleString('es-ES')} BS</td
									>
								{/if}
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>

<Meta title="Transferencias" />
