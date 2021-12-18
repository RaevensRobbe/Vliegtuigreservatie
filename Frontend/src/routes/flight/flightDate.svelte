<script lang="ts">
  import { goto } from '$app/navigation'
  import { FlightStore } from './../../stores/flightStore'
  import SelectFlightDate from './../../components/flightDateComponents/SelectFlightDate.svelte'
  import PassengerInput from './../../components/flightDateComponents/PassengerInput.svelte'
  import Intertitle from './../../components/Intertitle.svelte'
  import { onMount } from 'svelte'

  let flight = $FlightStore

  onMount(async () => {
    // console.log($FlightStore)
  })

  function goBack() {
    $FlightStore.retourDate = null
    $FlightStore.departureDate = null
    goto('/')
  }

  function handleSubmit() {
    // console.log(flight)
    goto('/flight/pickSeats')
  }
</script>

<svelte:head>
  <title>MCT Airlines - Flight Date</title>
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
  <Intertitle
    titleName={flight.departureCity + ' - ' + flight.destinationCity}
  />
  <h1 class="text-sm mb-4 md:text-xl">Choose your departure flight</h1>
  <SelectFlightDate
    url={`http://localhost:3001/api/v1/flight/flightInfoBetween/${flight.departureLocationId}/${flight.destinationLocationId}/${flight.departureDate}`}
    retour={false}
  />
</section>

{#if $FlightStore.retourDate}
  <section class="p-4 px-6 align-start">
    <Intertitle
      titleName={flight.destinationCity + ' - ' + flight.departureCity}
    />
    <h1 class="text-sm md:text-xl mb-4">Choose your retour flight</h1>
    <SelectFlightDate
      url={`http://localhost:3001/api/v1/flight/flightInfoBetween/${flight.destinationLocationId}/${flight.departureLocationId}/${flight.retourDate}`}
      retour={true}
    />
  </section>
{/if}

<section class="p-4 px-6 align-start">
  <Intertitle titleName="Passengers" />
  <p class="text-sm mb-4 md:text-xl">
    Please enter names as they appear on passport or travel documentation
  </p>
  <form on:submit|preventDefault={handleSubmit}>
    {#if $FlightStore.adults}
      <h1 class="text-forest-green font-bold text-xl">Adults</h1>
      {#each { length: $FlightStore.adults } as _, i}
        <PassengerInput adult={true} personnumber={i} />
      {/each}
    {/if}
    {#if $FlightStore.children}
      <h1 class="text-forest-green font-bold text-xl mt-4">Children</h1>
      {#each { length: $FlightStore.children } as _, i}
        <PassengerInput adult={false} personnumber={$FlightStore.adults + i} />
      {/each}
    {/if}
    <div class="flex justify-center">
      <!--submit button -->
      <button
        type="submit"
        class="flex p-4 mt-4 justify-center items-center font-bold text-2xl text-white bg-forest-green rounded-xl hover:bg-cyprus-green"
        onClick={handleSubmit}
      >
        Continue
      </button>
    </div>
  </form>
</section>
