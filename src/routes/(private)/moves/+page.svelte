<script lang="ts">
	import type { PageServerData } from './$types';
	import Modal from '$lib/components/modal.svelte';
	import { enhance } from '$app/forms';
	import Meta from '$lib/components/meta.svelte';
	import Form from '$lib/components/form.svelte';
	import InputWithIcon from '$lib/components/inputWithIcon.svelte';
	import { getMoves } from '$lib/services/bank/moves';
	import type { IUser } from '$lib/models/interfaces/user';
	import { formatMoves } from '$lib/formaters/moves';

	export let data: PageServerData;

	let canAddContact: boolean = false;
	let user: IUser = data.user;

	let errors: Array<any> = [];
	let modal: boolean = false;
	let success: boolean = false;

	let page: number = 1;
	let moves = data.moves;
	let nextPage: number | null = data.nextPage;
	let prevPage: number | null = data.prevPage;

	function toogleModal(): void {
		modal = !modal;
	}

	function incrementPage(): void {
		if (nextPage) page++;
	}

	function decrementPage(): void {
		if (prevPage) page--;
	}
</script>

<Modal id="modal" open={modal} {toogleModal}>
	{#if !success && !errors.length}
		<h2 class="font-bold text-2xl text-center">Transferencia</h2>
		<Form
			inputs={[
				{
					isRequired: true,
					name: 'accountNumber',
					title: 'Numero de cuenta',
					type: 'text',
					icon: '',
					iconLeft: false,
					placeholder: '',
					isCheck: false
				},
				{
					isRequired: true,
					name: 'amount',
					title: 'Monto',
					type: 'text',
					icon: '',
					iconLeft: false,
					placeholder: '',
					isCheck: false
				},
				{
					isRequired: true,
					name: 'description',
					title: 'Concepto del pago',
					type: 'text',
					icon: '',
					iconLeft: false,
					placeholder: '',
					isCheck: false
				}
			]}
			action="pay"
			buttonTitle="Realizar Transferencia"
			method="POST"
			isUpdate={false}
			colorBtn="33afb7"
			colorFontBtn="ffffff"
			callback={async ({ data }) => {
				success = data.success;
				errors = data.errors;

				if (!success) return;

				const currentMoves = await getMoves(user.accessToken, page);

				moves = formatMoves(currentMoves.data.data);

				user.balance = data.pay.balance;
			}}
		>
			<InputWithIcon
				icon=""
				iconLeft={false}
				isRequired={true}
				name="canAddContact"
				title="Agregar como contacto"
				placeholder=""
				type="checkbox"
				isCheck={canAddContact}
				handleChange={(e) => {
					canAddContact = e.target.checked;
				}}
			/>

			{#if canAddContact}
				<InputWithIcon
					icon=""
					iconLeft={false}
					isRequired={true}
					name="alias"
					title="Alias"
					placeholder=""
					type="text"
					isCheck={false}
					handleChange={(e) => {}}
				/>
				<InputWithIcon
					icon=""
					iconLeft={false}
					isRequired={true}
					name="descriptionContact"
					title="Descripcion"
					placeholder=""
					type="text"
					isCheck={false}
					handleChange={(e) => {}}
				/>
			{/if}
		</Form>
	{:else if success}
		<h2>Transferencia Realizada con exito</h2>
	{:else if !success && errors.length}
		<h2>{JSON.stringify(errors)}</h2>
	{/if}
</Modal>

<div class="col-span-3">
	<h1 class="text-2xl font-bold">Transferencias</h1>

	<div class="w-full flex justify-around">
		<div class="w-28">
			<form
				class="join grid grid-cols-3"
				method="POST"
				action="?/paginateMoves"
				use:enhance={() => {
					return ({ result, update }) => {
						const { data } = result;

						moves = data.moves;
						nextPage = data.nextPage;
						prevPage = data.prevPage;

						return update({ reset: false });
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
		<button
			class="btn btn-primary text-white"
			on:click={() => {
				modal = true;
			}}
		>
			Realizar <br />Transferencia
		</button>
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
								+{move.amount.toLocaleString()} BS
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
