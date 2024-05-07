<script lang="ts">
	import type { IContact } from '$lib/models/interfaces/contact';
	import type { INotification } from '$lib/models/interfaces/components';
	import type { PageData } from './$types';

	import { enhance } from '$app/forms';
	import Icon from '@iconify/svelte';
	import Modal from '$lib/components/modal.svelte';
	import Form from '$lib/components/form.svelte';
	import Notification from '$lib/components/notification.svelte';

	import Meta from '$lib/components/meta.svelte';
	import { formatContact } from '$lib/formaters/contacts';
	import { getContactById } from '$lib/services/bank/contacts';

	export let data: PageData;

	const { user } = data;

	let contacts: Omit<IContact[], 'user'> = data.contacts;
	let openContact: Omit<IContact, 'user'> | null = null;
	let notifications: INotification[] = [];

	let page: number = 1;
	let prevPage: number | null = data.prevPage;
	let nextPage: number | null = data.nextPage;
	let openContactId: number | null = null;

	let modal: boolean = false;

	function decrementPage(): void {
		if (prevPage) page--;
	}

	function incrementPage(): void {
		if (nextPage) page++;
	}

	function tooggleModal(): void {
		modal = !modal;

		if (modal) return;

		openContactId = null;
		openContact = null;
	}

	$: {
		if (notifications.length > 0) {
			setTimeout(() => {
				notifications = [];
			}, 3000);
		}
	}
</script>

{#if notifications.length > 0}
	<Notification messages={notifications} />
{/if}

<Modal open={modal} id="create-contacts" toogleModal={tooggleModal}>
	<h2 class="text-center text-2xl font-bold">Contacto</h2>
	{#if openContactId}
		<Form
			action="updateContact"
			buttonTitle="Guardar"
			method="POST"
			callback={async ({ data }) => {
				if (data.errors.length > 0) {
					notifications = data.errors.map(({ error }) => ({ type: 'error', message: error }));
					return;
				}

				modal = false;
				notifications = [{ message: data.message, type: 'success' }];
			}}
			colorBtn="33afb7"
			colorFontBtn="ffffff"
			inputs={[
				{
					isRequired: true,
					name: 'alias',
					title: 'Alias',
					type: 'text',
					value: openContact?.alias
				},
				{
					isRequired: true,
					name: 'accountNumber',
					title: 'Numero de cuenta',
					type: 'text',
					value: openContact?.accountNumber
				},
				{
					isRequired: false,
					name: 'description',
					title: 'Descripcion',
					type: 'text',
					value: openContact?.description
				}
			]}
			isUpdate={true}
		>
			<input bind:value={openContactId} class="hidden" name="id" />
		</Form>
	{:else}
		<Form
			action="createContact"
			buttonTitle="Guardar"
			method="POST"
			callback={async ({ data }) => {
				if (data.errors.length > 0) {
					notifications = data.errors.map(({ error }) => ({ type: 'error', message: error }));
					return;
				}

				modal = false;
				notifications = [{ message: data.message, type: 'success' }];
			}}
			colorBtn="33afb7"
			colorFontBtn="ffffff"
			inputs={[
				{ isRequired: true, name: 'alias', title: 'Alias', type: 'text' },
				{ isRequired: true, name: 'accountNumber', title: 'Numero de cuenta', type: 'text' },
				{ isRequired: false, name: 'description', title: 'Descripcion', type: 'text' }
			]}
			isUpdate={false}
		/>
	{/if}
</Modal>

<div class="col-span-3">
	<div class="my-4">
		<h1 class="text-2xl font-bold">Contactos</h1>

		<div class="w-full flex justify-around">
			<button
				class="btn btn-primary text-white"
				style="background-color: #33afb7"
				on:click={tooggleModal}
			>
				Crear
			</button>

			<div class="w-28">
				<form
					class="join grid grid-cols-3"
					method="POST"
					action="?/paginateContacts"
					use:enhance={() => {
						return ({ result, update }) => {
							const { data } = result;

							contacts = data.contacts;
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

			<form
				class="input input-bordered flex items-center gap-2 bg-white"
				action="?/searchContactsWithAlias"
				method="POST"
				use:enhance={() => {
					return ({ result, update }) => {
						const { data } = result;
						contacts = data.contacts;
						update({ reset: false });
					};
				}}
			>
				<input type="text" class="grow" placeholder="Buscar" name="alias" />

				<button class="badge text-black w-12 h-8" style="background-color: #33afb7">
					<Icon icon="pepicons-print:loop" width="1.5em" height="1.5em" />
				</button>
			</form>
		</div>
	</div>

	<div class="overflow-x-auto container">
		<table class="table">
			<thead>
				<tr class="text-lg">
					<th>Alias</th>
					<th>Nro Cuenta</th>
					<th>Descripcion</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				{#each contacts as contact}
					<tr
						on:dblclick={async () => {
							const findContact = await getContactById(contact.id, user.accessToken);
							openContact = formatContact(findContact.data.data);
							openContactId = contact.id;
							modal = true;
						}}
					>
						<td>{contact.alias}</td>
						<td>{contact.accountNumber}</td>
						<td>{contact.description}</td>
						<td>
							<form action="?/deleteContact" method="POST">
								<input value={contact.id} name="id" class="hidden" />
								<button class="btn btn-error text-white">
									<Icon icon="mingcute:delete-2-line" width="24" height="24" />
								</button>
							</form>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>

<Meta title="Contactos" />
