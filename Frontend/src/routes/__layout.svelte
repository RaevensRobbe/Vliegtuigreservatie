<script lang="ts">
  import AppHeader from '../components/AppHeader.svelte'
  import { initializeApp } from 'firebase/app'
  import { onMount } from 'svelte'
  import authStore from '../stores/authStore'
  import { getAuth, User } from 'firebase/auth'
  import AppFooter from '../components/AppFooter.svelte'

  onMount(() => {
    const firebaseConfig = {
      apiKey: 'AIzaSyDL9CZAEQy8dWqXTS_A6pGLDOApTU1kl7M',
      authDomain: 'express-server-auth-5455e.firebaseapp.com',
      projectId: 'express-server-auth-5455e',
      storageBucket: 'express-server-auth-5455e.appspot.com',
      messagingSenderId: '560074154452',
      appId: '1:560074154452:web:1617d7fc22c988e835f641',
    }

    initializeApp(firebaseConfig)

    getAuth().onAuthStateChanged((user: User) => {
      authStore.set({
        isLoggedIn: user !== null,
        user,
        firebaseControlled: true,
      })
    })

    // console.log("onMount")
  })
</script>

<main
  class="flex flex-col min-h-screen font-Montserrat bg-ghost-white text-dim-gray 3xl:max-w-screen-3xl 3xl:mx-auto"
>
  <AppHeader />
  <slot class="flex-grow" />
  <AppFooter />
</main>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;700&display=swap');

  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
