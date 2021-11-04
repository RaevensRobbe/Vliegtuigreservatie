<script lang="ts">
    import {  getAuth } from 'firebase/auth';
    import { debug } from "svelte/internal";
    import { goto } from '$app/navigation';

    import LoginForm from "../components/loginComponents/LoginForm.svelte";
    import authStore from '../stores/authStore';
    import loginCompStore from '../stores/loginCompStore'
    import RegisterForm from '../components/loginComponents/RegisterForm.svelte';

    let menuToggle = false;
    let accountdropDown = false;

    function toggler() {
        menuToggle = !menuToggle;
    }

    function showLoginForm(){
        let loginToggle = $loginCompStore.showLogin;
        loginToggle = !loginToggle;
        loginCompStore.set({
            showRegister: false,
            showLogin: loginToggle
        });
    }

    function toggleAccountTab(){
        accountdropDown = !accountdropDown;
        console.log(accountdropDown)
    }

    function logout(){
        const auth = getAuth();
        console.log("pressed")
        auth.signOut()
    }

    const goToAccountInfo = async() => {
        console.log("Go to accountInfoPage")
        loginCompStore.set({
            showRegister: false,
            showLogin: false
        });
        await goto('/user/accountInfo')
    }


</script>

<header class="grid grid-cols-2 py-8 px-6 text-dim-gray bg-white md:hidden">
    <button on:click={async() => {await goto('/')}} class="font-bold text-2xl text-forest-green justify-self-start">MCT airlines</button>
    {#if menuToggle}
        <button class="justify-self-end">
            <div on:click="{toggler}">
                <svg  class=" text-forest-green stroke-current h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </div>
        </button>
        {#if $authStore.isLoggedIn}
            <button class="justify-self-start self-end col-span-2 p-2 w-full hover:bg-gray-200">My bookings</button>
            <button class="justify-self-start self-end col-span-2 p-2 w-full hover:bg-gray-200">{ $authStore.user.email }</button>
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


<header class="flex-col justify-between px-6 py-8 gap-8 bg-white hidden md:flex">
    <div class="flex flex-row justify-between">
        <button on:click={async() => {await goto('/')}} class="font-bold text-2xl text-forest-green">MCT airlines</button>
    {#if $authStore.isLoggedIn}
        <div class="flex text-dim-gray gap-8">
            <button>My bookings</button>
            <button on:click={toggleAccountTab} class="font-bold text-xl text-forest-green">{ $authStore.user.displayName }</button>
            {#if accountdropDown}
                <div class="absolute top-24 right-0">
                    <div class="relative bg-white  z-10 flex flex-col items-center px-6">
                        <button class="text-lg text-forest-green py-4" on:click={goToAccountInfo}>Edit Account</button>
                        <button class="text-lg text-forest-green py-4" on:click={logout}>Sign out</button>
                    </div>
                </div>
            {/if}
        </div>
        
    {:else}
        <div>
            <button class="font-bold text-xl text-forest-green" on:click="{showLoginForm}">Log in</button>
        </div>
        {#if $loginCompStore.showLogin}
            <LoginForm/>
        {:else if $loginCompStore.showRegister}
            <RegisterForm/>
        {/if}
    {/if}
</header>