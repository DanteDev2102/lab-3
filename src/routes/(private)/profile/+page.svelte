<script lang="ts">
	import type { PageData } from './$types';

	import Meta from '$lib/components/meta.svelte';
	import { formatMove } from '$lib/formaters/moves';

	export let data: PageData;

	const user = data.user;
</script>

<section class="col-span-2 w-full">
	<section class="h-full bg-white rounded-lg flex flex-col items-center justify-between py-6 gap-1">
		<label class="form-control w-full max-w-xs">
			<div class="label">
				<span class="label-text-alt font-bold text-xl">Nombre</span>
			</div>
			<input
				type="text"
				class="input input-bordered bg-inherit font-bold"
				value={`${user.name} ${user.lastname}`}
				readonly
			/>
		</label>
		<label class="form-control w-full max-w-xs">
			<div class="label">
				<span class="label-text-alt font-bold text-xl">Cedula</span>
			</div>
			<input
				type="text"
				class="input input-bordered bg-inherit font-bold"
				value={user.vat}
				readonly
			/>
		</label>
		<label class="form-control w-full max-w-xs">
			<div class="label">
				<span class="label-text-alt font-bold text-xl">Numero de cuenta</span>
			</div>
			<input
				type="text"
				class="input input-bordered bg-inherit font-bold"
				value={user.account}
				readonly
			/>
		</label>
		<label class="form-control w-full max-w-xs">
			<div class="label">
				<span class="label-text-alt font-bold text-xl">Correo Electronico</span>
			</div>
			<input
				type="text"
				class="input input-bordered bg-inherit font-bold"
				value={user.email}
				readonly
			/>
		</label>
		<label class="form-control w-full max-w-xs">
			<div class="label">
				<span class="label-text-alt font-bold text-xl">Nombre</span>
			</div>
			<input
				type="text"
				class="input input-bordered bg-inherit font-bold"
				value={`${user.name} ${user.lastname}`}
				readonly
			/>
		</label>
		<label class="form-control w-full max-w-xs">
			<div class="label">
				<span class="label-text-alt font-bold text-xl">Numero de Telefono</span>
			</div>
			<input
				type="text"
				class="input input-bordered bg-inherit font-bold"
				value={user.phone || 'xxxx-xxxxxxx'}
				readonly
			/>
		</label>
		<label class="form-control w-full max-w-xs">
			<div class="label">
				<span class="label-text-alt font-bold text-xl">Numero de Telefono</span>
			</div>
			<input
				type="text"
				class="input input-bordered bg-inherit font-bold"
				value={user.birthdate}
				readonly
			/>
		</label>
		{#if user.accessToken}
			<button class="btn mt-4">Cambiar Clave</button>
		{/if}
	</section>
</section>

<table class="table">
	<thead>
		<th>Usuario</th>
		<th>Fecha</th>
		<th>Monto</th>
	</thead>
	<tbody>
		{#each data.lastestMoves as move}
			{@const formatedMove = formatMove(move)}
			<tr>
				<td>{formatedMove.accountNumber}</td>
				<td>{formatedMove.createdAt}</td>
				<td>{formatedMove.amount.toLocaleString()} Bs</td>
			</tr>
		{/each}
	</tbody>
</table>

<Meta title="Perfil" />
