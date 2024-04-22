<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="col-span-3">
	<h1 class="text-2xl font-bold">Contactos</h1>
	<div class="overflow-x-auto container">
		<table class="table">
			<thead>
				<tr class="text-lg">
					<th>
						<label>
							<input type="checkbox" class="checkbox" />
						</label>
					</th>
					<th>Alias</th>
					<th>Nro Cuenta</th>
					<th>Descripcion</th>
				</tr>
			</thead>
			<tbody>
				{#each data.contacts as contact}
					<tr>
						<td>
							<label>
								<input type="checkbox" class="checkbox" />
							</label>
						</td>
						<td>{contact.alias}</td>
						<td>{contact.account_number}</td>
						<td>{contact.description}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
