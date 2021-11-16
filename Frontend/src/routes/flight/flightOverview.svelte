<script lang="ts">
  import { goto } from '$app/navigation'
  import FlightOverviewItem from './../../components/flightOverviewComponents/FlightOverviewItem.svelte'
  import Intertitle from './../../components/Intertitle.svelte'

  //@ts-nocheck
  const retour = true

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
  <div class="flex flex-col bg-white shadow-md">
    <div class="grid {retour ? 'lg:grid-cols-2' : 'lg:grid-cols-1'} ">
      <FlightOverviewItem retour={false} />
      {#if retour}
        <FlightOverviewItem retour={true} />
      {/if}
    </div>
    <div class="border-t-1">
      <p class="m-4 text-2xl text-cyprus-green font-bold">Total: €898.36</p>
    </div>
  </div>
</section>

<section class="flex justify-center mb-4">
  <button
    type="submit"
    class="flex p-4 justify-center items-center font-bold text-2xl text-white bg-forest-green rounded-xl hover:bg-cyprus-green"
  >
    Go to payment
  </button>
</section>
