<script>
    export let name = undefined;
</script>

<header class="flex flex-row justify-between py-8 px-6 bg-white">
    <button class="font-bold text-2xl text-forest-green">MCT airlines</button>

    {#if name}
        <div class="flex text-dim-gray">
            <button class="px-2">My bookings</button>
            <button class="px-2">Contact</button>
            <button class="font-bold text-xl px-2 text-forest-green">{ name }</button>
        </div>
    {:else}
        <div>
            <button class="font-bold text-forest-green">Log in</button>
        </div>
    {/if}
</header>
