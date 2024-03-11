<script lang="ts">
    import Icon from '@iconify/svelte';

    export let type: string;
    export let title: string;
    export let icon: string;
    export let iconLeft: boolean;
    export let isRequired: boolean; 
</script>

<label class="form-control w-96">
    <div class="label">
        <strong>
            <span class="label-text">{title}</span>
        </strong>
    </div>
    <div class="input input-bordered flex items-center gap-2">
        {#if iconLeft}
            <Icon inline={true} class="w-4 h-4 opacity-70" icon={icon} style="font-size: 36px"/>
            <input type="{type}" placeholder={`ingrese su ${title}`} required={isRequired} />
        {:else}
            <input type="{type}" class="grow" placeholder={`ingrese su ${title}`} required={isRequired} />
            <Icon inline={true} class="w-4 h-4 opacity-70"  icon={icon} style="font-size: 36px"/>
        {/if}
    </div>
</label>

<style>
    .input {
        background-color: #ffffff;
    }
</style>