<script lang="ts">
    export let id: string;
    export let open: boolean;
    export let toogleModal: () => void;
</script>

<dialog id={id} class="modal" class:modal-open={open} >
    <div class="modal-box">
        <div>
            <button 
                class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" 
                on:click={toogleModal}
            >
                x
            </button>
        </div>
        <slot/>
    </div>
</dialog>