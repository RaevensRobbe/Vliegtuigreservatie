<script>
  import { goto } from '$app/navigation'

  import SelectFlightDate from './../../components/flightDateComponents/SelectFlightDate.svelte'
  import PassengerInput from './../../components/flightDateComponents/PassengerInput.svelte'
  import Intertitle from './../../components/Intertitle.svelte'
  import { FlightStore } from './../../stores/flightStore'

  let flight = $FlightStore

  function goBack() {
    goto('/')
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
    titleName={flight.departureLocation.split(',')[0] +
      ' - ' +
      flight.destinationLocation.split(',')[0]}
  />
  <h1 class="text-sm mb-6 md:text-xl">Choose your departure flight</h1>
  <SelectFlightDate
    url={`http://localhost:3001/api/v1/flight/flightInfo/${flight.departureLocationId}/${flight.destinationLocationId}`}
    retour={false}
  />
</section>

{#if $FlightStore.retourDate}
  <section class="p-4 px-6 align-start">
    <Intertitle
      titleName={flight.destinationLocation.split(',')[0] +
        ' - ' +
        flight.departureLocation.split(',')[0]}
    />
    <h1 class="text-sm md:text-xl mb-6">Choose your departure flight</h1>
    <SelectFlightDate
      url={`http://localhost:3001/api/v1/flight/flightInfo/${flight.destinationLocationId}/${flight.departureLocationId}`}
      retour={true}
    />
  </section>
{/if}

<section class="p-4 px-6 align-start">
  <Intertitle titleName="Passengers" />
  <p class="text-sm mb-2 md:text-xl">
    Please enter names as they appear on passport or travel documentation
  </p>
  {#if $FlightStore.adults}
    <h1 class="text-forest-green font-bold text-xl">Adults</h1>
    {#each { length: $FlightStore.adults } as _, i}
      <PassengerInput adult={true} personnumber={i} />
    {/each}
  {/if}
  {#if $FlightStore.children}
    <h1 class="text-forest-green font-bold text-xl mt-2">Children</h1>
    {#each { length: $FlightStore.children } as _, i}
      <PassengerInput adult={false} personnumber={i} />
    {/each}
  {/if}
</section>
