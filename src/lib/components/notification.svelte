<script lang="ts">
	import type { INotification } from "$lib/models/interfaces/components";

    export let messages: INotification[] = [] as INotification[];
</script>

<div class="toast toast-top toast-end">
	{#each messages as { type, message } }
        {@const alert = `alert alert-${type}` }
		<div 
            class={alert} 
            class:text-white={type === 'error'  || type === 'warning'} 
            class:text-black={type ==='success' || type === 'info'}
        >
			<span>{message}</span>
		</div>
	{/each}
</div>