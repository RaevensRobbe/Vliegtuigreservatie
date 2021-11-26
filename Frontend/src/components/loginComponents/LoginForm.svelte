<script lang="ts">
  import {
    getAuth,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
    updateProfile,
  } from 'firebase/auth'
  import { afterUpdate, onMount } from 'svelte'
  import { form } from 'svelte-forms'
  import { fade } from 'svelte/transition'

  import { requiredValidator, emailValidator } from '../../utils/inputValidator'
  import loginCompStore from '../../stores/loginCompStore'

  let validationError: boolean = true
  let email: string = ''
  let pw: string = ''

  let errors: any = {}

  const auth = getAuth()

  async function loginWithGoogle() {
    try {
      const provider = new GoogleAuthProvider()
      signInWithPopup(auth, provider).then(userCrendtial => {
        const user = userCrendtial.user
        const name = user.displayName.split(' ')
        const data = {
          id: user.uid,
          firstname: name[0],
          lastname: name[1],
          email: user.email,
        }
        post(data)
        showLoginForm()
      })
    } catch (error) {
      console.error(error)
    }
  }

  async function post(data) {
    //  console.log(`post functie ${data}`)
    const res = await fetch('http://localhost:3001/api/v1/user/createUser', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        data,
      }),
    })
  }

  const loginWithEmail = () => {
    signInWithEmailAndPassword(auth, email, pw)
      .then(userCredential => {
        const user = userCredential.user
        showLoginForm()
      })
      .catch(error => {
        const errorCode = error.code
        const errorMessage = error.message
        console.error(error)
      })
  }

  function showLoginForm() {
    let loginToggle = $loginCompStore.showLogin
    loginToggle = !loginToggle
    loginCompStore.set({
      showRegister: false,
      showLogin: loginToggle,
    })
  }

  const showRegisterForm = () => {
    let registerToggle = $loginCompStore.showRegister
    registerToggle = !registerToggle
    loginCompStore.set({
      showRegister: registerToggle,
      showLogin: false,
    })
  }

  const onSubmit = () => {
    if (requiredValidator(email) && requiredValidator(pw)) {
      errors.email = 'Email is required'
      errors.pw = 'Password is required'
      return
    }

    if (requiredValidator(email)) {
      errors.email = 'Email is required'
      return
    } else {
      if (!emailValidator(email)) {
        errors.email = 'Invalid Email'
        return
      } else errors.email = ''
    }

    if (requiredValidator(pw)) {
      errors.pw = 'Password is required'
      return
    } else errors.pw = ''

    loginWithEmail()
  }
</script>

<div class="absolute top-0 left-0 h-full z-10 w-full">
  <div
    class="flex justify-center items-center w-screen h-screen bg-black bg-opacity-70 fixed"
  >
    <form
      on:submit|preventDefault={onSubmit}
      class="w-4/5 sm:w-3/5 md:w-3/5 lg:w-2/5 xl:w-2/5 2xl:w-2/5 3xl:w-1/5 z-10 bg-white p-8 flex flex-col"
    >
      <div class="flex justify-between mb-4">
        <h1 class=" text-2xl text-forest-green">Login</h1>
        <svg
          on:click={showLoginForm}
          xmlns="http://www.w3.org/2000/svg"
          class="w-6 h-6 fill-current text-forest-green cursor-pointer"
          viewBox="0 0 32 32"
        >
          <path
            id="Icon_material-close"
            data-name="Icon material-close"
            d="M39.5,10.723,36.277,7.5,23.5,20.277,10.723,7.5,7.5,10.723,20.277,23.5,7.5,36.277,10.723,39.5,23.5,26.723,36.277,39.5,39.5,36.277,26.723,23.5Z"
            transform="translate(-7.5 -7.5)"
          />
        </svg>
      </div>
      <label for="email" class="font-bold"> Email </label>
      <div class="border-b text-dim-gray mb-2 border-current">
        <input
          bind:value={email}
          id="email"
          type="text"
          placeholder="name@acme.com"
          class="w-full focus:outline-none focus:ring focus:ring-forest-green text-sm md:text-md"
        />
      </div>
      {#if errors.email}
        <p class="text-red-600 -mt-2 mb-2">{errors.email}</p>
      {/if}

      <label for="pw" class="font-bold">Password</label>
      <div class="border-b text-dim-gray mb-2 border-current">
        <input
          bind:value={pw}
          type="password"
          id="pw"
          placeholder="enter password"
          class="w-full focus:outline-none focus:ring focus:ring-forest-green text-sm md:text-md"
        />
      </div>
      {#if errors.pw}
        <p class="text-red-600 -mt-2 mb-2">{errors.pw}</p>
      {/if}
      <!-- <button
                on:click={loginWithEmail}
                type="button"
                class="bg-forest-green rounded-full p-2 mt-4 font-bold text-2xl text-white" 
            >
                Login
            </button> -->

      <button
        type="submit"
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
        <button
          on:click={showRegisterForm}
          class="ml-1 font-bold text-forest-green">Register</button
        >
      </div>
    </form>
  </div>
</div>
