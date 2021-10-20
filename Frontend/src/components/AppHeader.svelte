<script>
    export let name = undefined;
</script>

<header class="flex flex-row justify-between py-8 px-6 bg-white">
    <button class="font-bold text-2xl text-forest-green">MCT airlines</button>

    {#if name}
        <div class="flex text-dim-gray gap-8">
            <button>My bookings</button>
            <button>Contact</button>
            <button class="font-bold text-xl text-forest-green">{ name }</button>
        </div>
    {:else}
        <div>
            <button class="font-bold text-forest-green">Log in</button>
        </div>
    {/if}
</header>
