<script lang="ts">
	import Logo from '$lib/components/logo.svelte';
	import Meta from '$lib/components/meta.svelte';
	import type { IUser } from '$lib/models/interfaces/user';
	import { userStore } from '$lib/stores/user';
	import type { PageServerData } from './$types';

	export let data: PageServerData;

	let user: IUser = $userStore;
</script>

<div class="bg-default h-screen w-full">

	<div class="navbar bg-default">
  		<div class="navbar-start">
  		    <Logo />
  		</div>
  		<div class="navbar-center hidden lg:flex ml-5">
  			<div class="flex flex-col-inverse">
				<h2 class="text-3xl font-bold mr-5">Mi Cuenta</h2>
				<span class="text-3xl font-bold">aaaaa</span>
			</div>
  		</div>
  		<div class="navbar-end">
  			alo
  		</div>
	</div>

	<div class="grid grid-cols-4 mx-10">
		<div>

		</div>
		<div class="col-span-3">
			<h1 class="text-xl font-bold">Transferencias</h1>

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
						{#each data.data as move}
							<tr>
								{#if move.multiplier === 1}
									<td>
										<img src="/add.png" alt="add" />
									</td>
									<td>{move.account_number}</td>
									<td>{move.description}</td>
									<td>{new Date(move.created_at).toLocaleString()}</td>
									<td class="text-green-600 font-bold text-xl">+{move.amount} BS</td>
								{:else if move.multiplier === -1}
									<td>
										<img src="/subtract.svg" alt="substract" />
									</td>
									<td>{move.account_number}</td>
									<td>{move.description}</td>
									<td>{new Date(move.created_at).toLocaleString()}</td>
									<td class="text-red-700 font-bold text-sm">-{move.amount} BS</td>
								{/if}
								
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	</div>
	
</div>

<!-- <p>{JSON.stringify(user)}</p> -->

<Meta title="Transferencias" />
