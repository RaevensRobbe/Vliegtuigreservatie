<script lang='ts'>
    import {  getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';
    import {fade} from 'svelte/transition';
    import loginCompStore from '../../stores/loginCompStore'

    let email:string;
    let pw:string;
    let error = null;
    let registerFormState = false

    const auth = getAuth();

    async function loginWithGoogle() {
        try{
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth,provider);
        }catch(error)
        {
            console.error(error);
        }
    }

    const loginWithEmail = () => {
        signInWithEmailAndPassword(auth, email, pw)
            .then((userCredential) => {
                const user = userCredential.user
            })
            .catch((error) => {
                const errorCode = error.code
                const errorMessage = error.message
                console.error(error)
            })
    }

    const ToggleRegisterForm = () => {
        registerFormState = !registerFormState;
        loginCompStore.set({
            showRegister: registerFormState,
            showLogin: false
        });
    }


</script>

<div class="absolute inset-0 ">
    <div class="relative inset-1/2 z-10 backdrop-filter">
            <form
                class="relative z-100 w-1/4 bg-white p-8 flex flex-col"
            >
                <h1 class=" text-2xl text-forest-green mb-4">Log in</h1>
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
                on:click={loginWithEmail}
                type="button"
                class="bg-forest-green rounded-full p-2 mt-4 font-bold text-2xl text-white" 
            >
                Login
            </button>

            <div class="mt-4">
                <button type="button" on:click|preventDefault={loginWithGoogle}>
                    Sign In with Google
                </button>
            </div>

            <div class="mt-4 flex">
                <p>No account yet?</p>
                <button on:click={ToggleRegisterForm} class="ml-1 font-bold text-forest-green">Register</button>
            </div>
        </form>
    </div>
</div>


