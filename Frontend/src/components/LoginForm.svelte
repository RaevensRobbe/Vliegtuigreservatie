<script lang='ts'>
    import { initializeApp, FirebaseOptions, FirebaseApp } from 'firebase/app'
    import { initAuth } from '../composables/useFirebase';
    import {fade} from 'svelte/transition';

    const firebaseConfig = {
        apiKey: "AIzaSyDL9CZAEQy8dWqXTS_A6pGLDOApTU1kl7M",
        authDomain: "express-server-auth-5455e.firebaseapp.com",
        projectId: "express-server-auth-5455e",
        storageBucket: "express-server-auth-5455e.appspot.com",
        messagingSenderId: "560074154452",
        appId: "1:560074154452:web:00f9c5c307c4d6da35f641"
    };

    const app: FirebaseApp = initializeApp(firebaseConfig)

    const { loginWithEmailPassword, loginWithGoogle, logout, user } = initAuth();

    let error = null;
    const user2 = undefined

    let email;
    let pw;

    const loginHandler = async event => {
        const { email, password } = event.target.elements;
        try {
            error = null;
            await loginWithEmailPassword(email.value, password.value);
        } catch (err) {
            error = err;
        }
    };
</script>

<div class="absolute inset-0 ">
    {#if user2}
        <div class="w-full max-w-xs">
            <div class="text-center">
            <h2>{$user.email}</h2>
            <button type="button" class="mt-3" on:click={logout}>Logout</button>
            </div>
        </div>
    {:else}
    <div class="relative inset-1/2 z-10 backdrop-filter backdrop-blur-sm">
            <form
                on:submit|preventDefault={loginHandler}
                class="relative z-100 w-1/4 bg-white p-8 flex flex-col"
            >
                <h1 class="font-bold text-2xl text-forest-green mb-4">Log in</h1>
                <label for="email" class="mb-2">
                    Email
                </label>
                <input  
                    bind:value={email}
                    id="email"
                    type="email"
                    placeholder="name@acme.com"
                    class="w-full border-b mb-4 h-8 focus:outline-none focus:ring focus:ring-forest-green" 
                />

                <label for="pw" class="mb-2">Password</label>
                <input
                    bind:value={pw}
                    type="password" 
                    id="pw"
                    class="w-full border-b mb-4 h-8 focus:outline-none focus:ring focus:ring-forest-green"
                />
            {#if error}
                <div transition:fade class="p-2 mb-6 bg-red-300">{error.message}</div>
            {/if}
            <button
                type="button"
                class="bg-forest-green rounded-full p-2 mt-4 font-bold text-2xl text-white" 
            >
                Login
            </button>

            <div class="mt-3">
                <button type="button" on:click|preventDefault={loginWithGoogle}>
                Sign In with Google
                </button>
            </div>
            </form>
        </div>
    {/if}
</div>