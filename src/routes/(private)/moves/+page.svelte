<script lang="ts">
	import { enhance } from '$app/forms';
	import Meta from '$lib/components/meta.svelte';
	import type { PageServerData } from './$types';

	export let data: PageServerData;

	let page: number = 1;

	let moves = data.moves;
	let nextPage: number | null = data.nextPage;
	let prevPage: number | null = data.prevPage;

	function incrementPage() {
		if (nextPage) page++;
	}

	function decrementPage() {
		if (prevPage) page--;
	}
</script>

<div class="col-span-3">
	<h1 class="text-2xl font-bold">Transferencias</h1>

	<div class="w-full flex justify-around">
		<div class="w-28">
			<form
				class="join grid grid-cols-3"
				method="POST"
				action="?/paginateMoves"
				use:enhance={() => {
					return ({ result }) => {
						const { data } = result;

						moves = data.moves;
						nextPage = data.nextPage;
						prevPage = data.prevPage;
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
							<td class="text-green-600 font-bold text-xl">
								+{move.amount.toLocaleString('es-ES')} BS
							</td>
						{:else if move.multiplier === -1}
							<td>
								<img src="/subtract.svg" alt="substract" />
							</td>
							<td>{move.accountNumber}</td>
							<td>{move.description}</td>
							<td>{new Date(move.createdAt).toLocaleString()}</td>
							<td class="text-red-600 font-bold text-xl">
								-{move.amount.toLocaleString('es-ES')} BS
							</td>
						{/if}
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>

<Meta title="Transferencias" />
