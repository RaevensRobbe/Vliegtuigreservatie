<script lang="ts">
  import { goto } from '$app/navigation'

  import {
    confirmPasswordReset,
    getAuth,
    sendPasswordResetEmail,
  } from 'firebase/auth'
  import Intertitle from '../../components/Intertitle.svelte'

  const auth = getAuth()
  let email: string = ''
  let test
  let newPwd
  let errors: any = {}
  let success: any = {}
  const onSubmit = async () => {
    if (success.email) {
      goto('/')
    } else {
      sendPasswordResetEmail(auth, email).then(() => {
        success.email = 'Email has been sent'
        confirmPasswordReset(auth, test, newPwd)
      })
    }
  }
</script>

<body>
  <section class="m-4 px-6">
    <Intertitle titleName="Forgot password" />
    <div class="flex justify-center">
      <form
        on:submit|preventDefault={onSubmit}
        class="w-4/5 sm:w-3/5 md:w-3/5 lg:w-2/5 xl:w-2/5 2xl:w-2/5 3xl:w-1/5 z-10 bg-white p-8 flex flex-col"
      >
        <div class="mb-4">
          <h1 class=" text-2xl text-forest-green">Reset password</h1>
        </div>
        <label for="email" class="font-bold"> Email </label>
        <div class="border-b text-dim-gray mb-2 border-current">
          <input
            bind:value={email}
            id="email"
            type="text"
            placeholder="name@acme.com"
            class="w-full focus:outline-none py-1 focus:ring focus:ring-forest-green text-sm md:text-md"
          />
        </div>
        {#if errors.email}
          <p class="text-red-600 -mt-2 mb-2">{errors.email}</p>
        {/if}
        {#if success.email}
          <p class="text-forest-green -mt-2 mb-2">{success.email}</p>
        {/if}

        {#if success.email}
          <button
            type="submit"
            class="bg-forest-green rounded-full p-2 mt-4 font-bold text-2xl text-white"
          >
            Back to home
          </button>
        {:else}
          <button
            type="submit"
            class="bg-forest-green rounded-full p-2 mt-4 font-bold text-2xl text-white"
          >
            Reset
          </button>
        {/if}
      </form>
    </div>
  </section>
</body>
