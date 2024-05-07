<script lang="ts">
	import type { PageData } from './$types';

	import { getSumEnterAndOutputsValuesInPeriod } from '$lib/services/bank/moves';

	import Meta from '$lib/components/meta.svelte';
	import { DatePicker } from '@svelte-plugins/datepicker';

	export let data: PageData;

	const user = data.user;

	function getFirstDayOfMonth() {
		const now = new Date();
		return new Date(now.getFullYear(), now.getMonth(), 1);
	}

	function formatDate() {
		return startDate.toLocaleDateString('es-ES', {
			year: '2-digit',
			month: '2-digit',
			day: '2-digit'
		});
	}

	function formatEndDate() {
		return endDate.toLocaleDateString('es-ES', {
			year: '2-digit',
			month: '2-digit',
			day: '2-digit'
		});
	}

	let inputs = data.inputs;
	let outputs = data.outputs;

	let startDate: Date = getFirstDayOfMonth();
	let isOpen: boolean = false;
	let formattedStartDate = formatDate();

	let endDate: Date = new Date();
	let isOpenEndDate: boolean = false;
	let formattedEndDate = formatEndDate();

	async function setPays() {
		const initDate = startDate instanceof Date ? startDate.getTime() : startDate;
		const finishDate =
			endDate instanceof Date
				? endDate.getTime()
				: endDate === null
					? new Date().getTime()
					: endDate;
		const pays = await getSumEnterAndOutputsValuesInPeriod(user.accessToken, initDate, finishDate);

		inputs = pays.input;
		outputs = pays.output;
	}
</script>

<div class="col-span-1 flex flex-col my-32">
	<div class="flex justify-between">
		<DatePicker
			bind:isOpen
			bind:startDate
			onDayClick={({ startDate: start }) => {
				startDate = new Date(start);
				formattedStartDate = startDate.toLocaleDateString('es-ES', {
					year: '2-digit',
					month: '2-digit',
					day: '2-digit'
				});
				setPays();
			}}
		>
			<label>
				<div class="label">
					<span class="label-text-alt font-bold text-xl">Fecha de inicio</span>
				</div>
				<input
					class="input input-xs input-bordered"
					type="text"
					placeholder="Select date"
					bind:value={formattedStartDate}
					on:click={() => (isOpen = !isOpen)}
				/>
			</label>
		</DatePicker>

		<DatePicker
			bind:isOpen={isOpenEndDate}
			bind:endDate
			onDayClick={({ startDate: end }) => {
				endDate = new Date(end);
				formattedEndDate = endDate.toLocaleDateString('es-ES', {
					year: '2-digit',
					month: '2-digit',
					day: '2-digit'
				});
				setPays();
			}}
		>
			<label>
				<div class="label">
					<span class="label-text-alt font-bold text-xl">Fecha de fin</span>
				</div>
				<input
					class="input input-xs input-bordered"
					type="text"
					placeholder="Select date"
					bind:value={formattedEndDate}
					on:click={() => (isOpenEndDate = !isOpenEndDate)}
				/>
			</label>
		</DatePicker>
	</div>
	<div role="alert" class="alert shadow-lg my-10">
		<h2 class="text-2xl font-bold">Gastos:</h2>
		<div class="text-red-700 font-bold text-xl">{outputs.toLocaleString()} BS</div>
	</div>
	<div role="alert" class="alert shadow-lg">
		<h2 class="text-2xl font-bold">Ingresos:</h2>
		<div class="text-green-700 font-bold text-xl">{inputs.toLocaleString()} BS</div>
	</div>
</div>

<div class="w-fit">
	<table class="table col-span-2 mx-32">
		<thead class="text-2xl">
			<th></th>
			<th>Usuario</th>
			<th>Fecha</th>
			<th>Monto</th>
		</thead>
		<tbody>
			{#each data.recentMoves as move}
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

<Meta title="Banco Universitario" />
