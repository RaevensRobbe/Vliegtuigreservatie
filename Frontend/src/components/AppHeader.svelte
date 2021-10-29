<script lang="ts">
import { debug } from "svelte/internal";
import LoginForm from "./LoginForm.svelte";

    //export let name = undefined;
    let name = undefined
    let menuToggle = false;
    let loginToggle = false

    function toggler() {
        menuToggle = !menuToggle;
    }

    function showLoginForm(){
        loginToggle = !loginToggle;
        console.log(loginToggle)
    }

</script>

<header class="grid grid-cols-2 py-8 px-6 text-dim-gray bg-white md:hidden">
    <button class="font-bold text-2xl text-forest-green justify-self-start">MCT airlines</button>
    {#if menuToggle}
        <button class="justify-self-end">
            <div on:click="{toggler}">
                <svg  class=" text-forest-green stroke-current h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </div>
        </button>
        {#if name}
            <button class="justify-self-start self-end col-span-2 p-2 w-full hover:bg-gray-200">My bookings</button>
            <button class="justify-self-start self-end col-span-2 p-2 w-full hover:bg-gray-200">{ name }</button>
            {:else}
            <button
                class="justify-self-start self-end col-span-2 p-2 w-full hover:bg-gray-200">
                <div
                    on:click="{showLoginForm}">
                    <p>Log in</p>
                </div>
            </button>
        {/if}
        {:else}
        <button class="justify-self-end">
            <div on:click="{toggler}">
                <svg class=" text-forest-green stroke-current h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
            </div>
        </button>
    {/if}
</header>


<header class="flex-col justify-between py-8 px-6 gap-8 bg-white hidden md:flex">
    <div class="flex flex-row justify-between">
        <button class="font-bold text-2xl text-forest-green">MCT airlines</button>
    {#if name}
        <div class="flex text-dim-gray gap-8">
            <button>My bookings</button>
            <button class="font-bold text-xl text-forest-green">{ name }</button>
        </div>
    {:else}
        <div>
            <button class="font-bold text-xl text-forest-green" on:click="{showLoginForm}">Log in</button>
        </div>
        {#if loginToggle}
            <LoginForm />
        {/if}
    {/if}
</header>