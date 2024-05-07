<script lang="ts">
	import type { PageData } from './$types';
	import type { INotification } from '$lib/models/interfaces/components';

	import DatePicker from '@svelte-plugins/datepicker';

	import Meta from '$lib/components/meta.svelte';
	import Modal from '$lib/components/modal.svelte';
	import Form from '$lib/components/form.svelte';
	import Notification from '$lib/components/notification.svelte';

	export let data: PageData;

	const user = data.user;

	let newPassword: string = '';
	let oldPassword: string = '';
	let confirmPassword: string = '';

	let notifications: INotification[] = [];
	let showChangePasswordModal: boolean = false;

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

<Modal
	open={showChangePasswordModal}
	id="modal"
	toogleModal={() => {
		showChangePasswordModal = false;
	}}
>
	<h2 class="text-center text-3xl font-bold">Cambiar Clave</h2>
	{#key oldPassword || newPassword || confirmPassword}
		<Form
			action="changePassword"
			buttonTitle="Cambiar"
			callback={({ data }) => {
				if (!data.success) {
					notifications = [{ type: 'error', message: data.message }];
					return;
				}

				showChangePasswordModal = false;
				notifications = [{ message: data.message, type: 'success' }];
				newPassword = '';
				oldPassword = '';
				confirmPassword = '';
			}}
			method="POST"
			inputs={[
				{
					isRequired: true,
					name: 'oldPassword',
					type: 'password',
					handleChange: () => {},
					icon: '',
					title: 'Clave Actual',
					value: oldPassword
				},
				{
					isRequired: true,
					name: 'newPassword',
					type: 'password',
					handleChange: () => {},
					icon: '',
					title: 'Nueva Clave',
					value: newPassword
				},
				{
					isRequired: true,
					name: 'confirmPassword',
					type: 'password',
					handleChange: () => {},
					icon: '',
					title: 'Confirmar Clave',
					value: confirmPassword
				}
			]}
		/>
	{/key}
</Modal>

<section class="col-span-1 w-full">
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
				<span class="label-text-alt font-bold text-xl">Fecha de nacimiento</span>
			</div>
			<input
				type="text"
				class="input input-bordered bg-inherit font-bold"
				value={user.birthdate}
				readonly
			/>
		</label>
		{#if user.accessToken}
			<button
				class="btn mt-4"
				on:click={() => {
					showChangePasswordModal = true;
				}}>Cambiar Clave</button
			>
		{/if}
	</section>
</section>

<div class="w-fit">
	<table class="table col-span-2 mx-32">
		<thead class="text-2xl">
			<th></th>
			<th>Usuario</th>
			<th>Fecha</th>
			<th>Monto</th>
		</thead>
		<tbody>
			{#each data.lastestMoves as move}
				{#if move.multiplier === 1}
					<tr>
						<td>
							<img src="/add.png" alt="add" />
						</td>
						<td>{move.accountNumber}</td>
						<td>{new Date(move.createdAt).toLocaleString()}</td>
						<td class="text-green-600 font-bold text-xl">
							+{move.amount.toLocaleString()} BS
						</td>
					</tr>
				{:else if move.multiplier === -1}
					<tr>
						<td>
							<img src="/subtract.svg" alt="substract" />
						</td>
						<td>{move.accountNumber}</td>
						<td>{new Date(move.createdAt).toLocaleString()}</td>
						<td class="text-red-600 font-bold text-xl">
							-{move.amount.toLocaleString('es-ES')} BS
						</td>
					</tr>
				{/if}
			{/each}
		</tbody>
	</table>
</div>

<Meta title="Perfil" />
