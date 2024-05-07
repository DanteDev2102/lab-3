<script lang="ts">
	import type { PageServerData } from './$types';
	import type { IContact } from '$lib/models/interfaces/contact';
	import type { INotification } from '$lib/models/interfaces/components';

	import { enhance } from '$app/forms';
	import { getContacts } from '$lib/services/bank/contacts';
	import { formatContacts } from '$lib/formaters/contacts';

	import Icon from '@iconify/svelte';
	import Modal from '$lib/components/modal.svelte';
	import Notification from '$lib/components/notification.svelte';
	import Form from '$lib/components/form.svelte';
	import Meta from '$lib/components/meta.svelte';
	import InputWithIcon from '$lib/components/inputWithIcon.svelte';

	export let data: PageServerData;

	const { user } = data;

	let canAddContact: boolean = false;

	let notifications: Array<INotification> = [];
	let modal: boolean = false;

	let page: number = 1;
	let moves = data.moves;
	let nextPage: number | null = data.nextPage;
	let prevPage: number | null = data.prevPage;

	let modalFindContact: boolean = false;
	let pageContacts: number = 1;
	let contactsModal: Omit<IContact, 'user'>[] = [];
	let accountNumberPaymentAssign: string = '';

	function assignContacts(contacts: Omit<IContact, 'user'>[]): string {
		contactsModal = contacts;
		return '';
	}

	function toogleModal(): void {
		modal = false;
		accountNumberPaymentAssign = '';
	}

	function toogleModalFindContact(): void {
		modalFindContact = false;
	}

	function incrementPage(): void {
		if (nextPage) page++;
	}

	function decrementPage(): void {
		if (prevPage) page--;
	}

	$: {
		if (notifications.length > 0) {
			setTimeout(() => {
				notifications = [];
				location.reload();
			}, 3000);
		}
	}
</script>

{#if notifications.length > 0}
	<Notification messages={notifications} />
{/if}

<Modal id="modal" open={modal} {toogleModal}>
	<h2 class="font-bold text-2xl text-center">Transferencia</h2>

	<div class="w-full flex justify-center my-6">
		<button
			on:click={() => {
				modalFindContact = true;
			}}
		>
			<Icon icon="ic:twotone-save" width="2rem" height="2rem" />
		</button>
	</div>

	{#key accountNumberPaymentAssign}
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
					isCheck: false,
					value: accountNumberPaymentAssign
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
				toogleModal();

				if (data.errors.length > 0) {
					notifications = data.errors.map(({ error }) => {
						return {
							type: 'error',
							message: error
						};
					});
					return;
				}

				notifications = [
					{
						type: 'success',
						message: 'Transferencia realizada correctamente'
					}
				];
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
	{/key}
</Modal>

<Modal id="select-contact" open={modalFindContact} toogleModal={toogleModalFindContact}>
	<h3 class="text-3xl font-bold text-center">Contactos</h3>
	<div class="join grid grid-cols-3">
		<button
			class="join-item btn btn-outline hover:bg-inherit hover:text-black"
			on:click={() => {
				if (pageContacts > 1) pageContacts--;
			}}
		>
			&#60
		</button>
		<input
			readonly
			type="text"
			name="page"
			bind:value={pageContacts}
			class="input input-bordered px-2 text-center bg-inherit hover:bg-inherit hover:text-black text-black"
		/>
		<button
			class="join-item btn btn-outline hover:bg-inherit hover:text-black"
			on:click={() => {
				if (contactsModal.length === 10) pageContacts++;
			}}
		>
			&#62
		</button>
	</div>
	<table class="table table-zebra">
		<thead>
			<th></th>
		</thead>
		{#await getContacts(pageContacts, user.accessToken) then contacts}
			{@const formatContactsData = formatContacts(contacts.data.data)}
			{assignContacts(formatContactsData)}
			{#each formatContactsData as contact}
				<tr
					class="hover:bg-gray-100 text-sm"
					on:click={() => {
						accountNumberPaymentAssign = contact.accountNumber;
						modalFindContact = false;
					}}
				>
					<td>{contact.alias}</td>
				</tr>
			{/each}
		{/await}
	</table>
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
			style="background-color: #33afb7"
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
