<script lang="ts">
  import { getAuth } from 'firebase/auth'
  import { debug } from 'svelte/internal'
  import { goto } from '$app/navigation'

  import LoginForm from '../loginComponents/LoginForm.svelte'
  import authStore from '../../stores/authStore'
  import loginCompStore from '../../stores/loginCompStore'
  import RegisterForm from '../loginComponents/RegisterForm.svelte'

  let menuToggle = false
  let accountdropDown = false

  function toggler() {
    menuToggle = !menuToggle
  }

  function goToBookings() {
    goto('../bookings/bookingOverview')
  }

  function goToHomepage() {
    goto('../')
  }

  function showLoginForm() {
    let loginToggle = $loginCompStore.showLogin
    loginToggle = !loginToggle
    loginCompStore.set({
      showRegister: false,
      showLogin: loginToggle,
    })
  }

  function toggleAccountTab() {
    accountdropDown = !accountdropDown
    // console.log(accountdropDown)
  }

  const goToAccountInfo = async () => {
    loginCompStore.set({
      showRegister: false,
      showLogin: false,
    })
    await goto('/user/accountInfo')
  }
  
  const goToAdminOverview = async () => {
    await goto('/admin/overviewFlights')
  }

  function logout() {
    const auth = getAuth()
    auth.signOut()
  }
</script>

<!-- Mobile -->
<header class="grid grid-cols-2 py-8 px-6 text-dim-gray bg-white md:hidden">
  <button
    class="font-bold text-2xl text-forest-green justify-self-start"
    on:click={goToHomepage}
    >MCT airlines
  </button>
  {#if menuToggle}
    <button class="justify-self-end">
      <div on:click={toggler}>
        <svg
          class=" text-forest-green stroke-current h-8"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          ><line x1="18" y1="6" x2="6" y2="18" /><line
            x1="6"
            y1="6"
            x2="18"
            y2="18"
          />
        </svg>
      </div>
    </button>
    {#if $authStore.isLoggedIn}
      {#if $authStore.admin}
        <button
          class="justify-self-start self-end col-span-2 p-2 w-full hover:bg-gray-200"
          on:click={goToAdminOverview}>AdminOverview</button
        >
      {/if}
      <button
        class="justify-self-start self-end col-span-2 p-2 w-full hover:bg-gray-200"
        on:click={goToBookings}>My bookings</button
      >
      <button
        class="justify-self-start self-end col-span-2 p-2 w-full hover:bg-gray-200"
        >{$authStore.user.email}</button
      >
    {:else}
      <button
        class="justify-self-start self-end col-span-2 p-2 w-full hover:bg-gray-200"
      >
        <div on:click={showLoginForm}>
          <p>Login</p>
        </div>
      </button>
    {/if}
  {:else}
    <button class="justify-self-end">
      <div on:click={toggler}>
        <svg
          class=" text-forest-green stroke-current h-8"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          ><line x1="3" y1="12" x2="21" y2="12" /><line
            x1="3"
            y1="6"
            x2="21"
            y2="6"
          /><line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </div>
    </button>
  {/if}
</header>

<!-- large screen -->
<header>
  {#if $loginCompStore.showLogin}
    <LoginForm />
  {:else if $loginCompStore.showRegister}
    <RegisterForm />
  {/if}
  <div class="flex-col justify-between py-8 gap-8 bg-white hidden md:flex">
    <div class="flex flex-row justify-between">
      <button
        class="font-bold text-2xl text-forest-green pl-6"
        on:click={goToHomepage}>MCT airlines</button
      >
      {#if $authStore.isLoggedIn}
        <div class="flex text-dim-gray gap-8">
          {#if $authStore.admin}
            <button on:click={goToAdminOverview}>AdminOverview</button>
          {/if}
          <button on:click={goToBookings}>My bookings</button>
          <div class="relative inline-block">
            <button
              on:click={toggleAccountTab}
              class="font-bold text-xl text-forest-green pl-4 pr-6"
              >{$authStore.user.displayName}</button
            >
            {#if accountdropDown}
              <div
                id="myDropdown"
                class="absolute shadow-md bg-white  overflow-auto z-10 w-full top-16"
              >
                <button
                  class="text-lg text-forest-green py-4  hover:bg-gray-200 w-full px-6"
                  on:click={goToAccountInfo}>Edit Account</button
                >
                <button
                  class="text-lg text-forest-green py-4 hover:bg-gray-200 w-full px-6"
                  on:click={logout}>Sign out</button
                >
              </div>
            {/if}
          </div>
        </div>
      {:else}
        <div>
          <button
            class="font-bold text-xl text-forest-green pr-6"
            on:click={showLoginForm}>Login</button
          >
        </div>
      {/if}
    </div>
  </div>
</header>
