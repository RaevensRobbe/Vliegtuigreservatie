<script lang="ts">
  import Intertitle from './../../components/Intertitle.svelte'

  //@ts-nocheck

  function goBack() {
    goto('/')
  }
</script>

<svelte:head>
  <title>MCT Airlines</title>
</svelte:head>

<section
  class="p-4 flex hover:cursor-pointer hover:font-bold"
  on:click={goBack}
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="h-6 w-6 my-auto"
    viewBox="0 0 20.828 37.657"
  >
    <path
      id="chevron-down"
      d="M6,9,22,25,38,9"
      transform="translate(27 -3.172) rotate(90)"
      fill="none"
      stroke="#686868"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="4"
    />
  </svg>

  <p class="">Go back</p>
</section>

<section class="p-4 px-6 align-start">
  <Intertitle titleName="Overview" />
  <div class="p-4 grid grid-cols-2" />
</section>
