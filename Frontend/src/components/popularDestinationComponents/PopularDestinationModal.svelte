<script lang="ts">
  import popularCompStore from '../../stores/popularCompStore'
  import type PopularDestinationGraphql from './../../models/PopularDestinationModel.type'
  import { fade, scale } from 'svelte/transition'

  function closeModal() {
    popularCompStore.set({
      showPopular: false,
      img: null,
      name: null,
      intro: null,
      summary: null,
    })
  }
</script>

<div class="absolute top-0 left-0 h-full z-10 w-full">
  <div
    class="flex justify-center items-center w-screen h-screen bg-black bg-opacity-70 fixed"
  >
    <div
      class="flex relative flex-col w-3/4 h-4/5 bg-white shadow-md overflow-y-scroll scrollbar"
      in:scale
      out:scale
    >
      <!-- svelte-ignore a11y-img-redundant-alt -->
      <div class="absolute w-full">
        <div class="flex justify-end ">
          <div
            class="ml-auto mr-4 mt-4 p-2 bg-gray-900 opacity-50 cursor-pointer rounded-full hover:opacity-90"
            on:click={closeModal}
          >
            <svg
              class="h-6 w-6 text-white stroke-current"
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
              /></svg
            >
          </div>
        </div>
      </div>
      {#if $popularCompStore.img}
        <img
          class="max-h-1/2 object-cover"
          src={$popularCompStore.img}
          alt="Picture of {$popularCompStore.name}"
        />
      {:else}
        <!-- If there is no image show placeholder -->
        <div class="bg-gray-300">
          <img
            class="object-fill opacity-0 rounded-t-lg"
            src="https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1740&q=80"
            alt=""
          />
        </div>
      {/if}
      <div class="p-4">
        <h1 class="font-bold text-2xl md:text-4xl text-forest-green">
          {$popularCompStore.name}
        </h1>
        <p class="my-4 text-sm md:text-base font-bold">
          {$popularCompStore.intro}
        </p>
        <p class="text-sm md:text-base">{$popularCompStore.summary}</p>
      </div>
      <p class="text-sm m-4 mt-auto">
        All text comes from <a
          rel="preconnect"
          class="font-bold"
          target="_blank"
          href="https://wikipedia.org/">wikipedia</a
        >
      </p>
    </div>
  </div>
</div>

<style>
  /* Hide scrollbar for Chrome, Safari and Opera */
  .scrollbar::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  .scrollbar {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
</style>
