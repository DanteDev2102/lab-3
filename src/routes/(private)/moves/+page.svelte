<script lang="ts">
	import type { IUser } from '$lib/models/interfaces/user';
	import { userStore } from '$lib/stores/user';
	import type { PageServerData } from './$types';

	export let data: PageServerData;

	let user: IUser = $userStore;
</script>

<h1>moves</h1>
<p>{JSON.stringify(data)}</p>
<p>{JSON.stringify(user)}</p>
