<script lang="ts">
    export let row:number;
    export let column:number;
    export let taken:boolean;

</script>

{#if taken === false}
    <div class="w-12 h-12 bg-white border border-forest-green flex items-center"/>
{:else if taken === true}
    <div class="w-12 h-12 bg-gray-300 mr-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 " viewBox="0 0 24 24" stroke="#ffffff" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
    </div>
{/if}
