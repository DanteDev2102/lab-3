<script lang="ts">
	import type { IContact } from '$lib/models/interfaces/contact';
	import type { PageData } from './$types';

	import { enhance } from '$app/forms';
	import Icon from '@iconify/svelte';

	import Meta from '$lib/components/meta.svelte';

	export let data: PageData;

	let contacts: Omit<IContact[], 'user'> = data.contacts;

	let page: number = 1;
	let prevPage: number | null = data.prevPage;
	let nextPage: number | null = data.nextPage;

	function decrementPage(): void {
		if (prevPage) page--;
	}

	function incrementPage(): void {
		if (nextPage) page++;
	}
</script>

<div class="col-span-3">
	<div class="my-4">
		<h1 class="text-2xl font-bold">Contactos</h1>
		
		<div class="w-full flex justify-around">
			<button class="btn btn-primary text-white" style="background-color: #33afb7">
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
				class="input input-bordered flex items-center gap-2  bg-white" 
				action="?/searchContactsWithAlias"
				method="POST"
				use:enhance={() => {
					return ({ result, update }) => {
							const { data } = result;
							contacts = data.contacts
							update({ reset: false });
						}
					}
				}
			>
  				<input type="text" class="grow" placeholder="Buscar" name="alias"/>

  				<button 
					class="badge text-black w-12 h-8" 
					style="background-color: #33afb7"
				>
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
					<tr>
						<td>{contact.alias}</td>
						<td>{contact.accountNumber}</td>
						<td>{contact.description}</td>
						<td>
							<form action="?/deleteContact" method="POST">
								<input value={contact.id} name="id" class="hidden"/>
								<button class="btn btn-error text-white">ELIMINAR</button>
							</form>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>

<Meta title="Contactos" />
