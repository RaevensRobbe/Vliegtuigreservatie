<script lang="ts">
    import Intertitle from '../../components/Intertitle.svelte'
    import SearchFlightNumberComponent from '../../components/adminComponents/SearchFlightNumberComponent.svelte'
    import type Flight from '../../models/FlightModel.type'
    import { onMount } from 'svelte'
    import { get } from '../../utils/useApi'
    import BookingFlight from '../../components/bookingOverviewComponents/bookingFlight.svelte'
    import Spinner from '../../components/animations/spinner.svelte'
    import { goto } from '$app/navigation'
    import authStore from '../../stores/authStore'
    import FlightList from '../../components/adminComponents/flightList.svelte'
    
  let flights: Array<Flight> = []
  let flightsLoaded: boolean = false
  let specificFlightData: Flight
  let flightNumber: string = null
  let searchIsActive: boolean = false

  function handleSubmit() {
    if (flightNumber == '') {
      searchIsActive = false
    } else {
      searchIsActive = true

      specificFlightData = flights.find(flight => flight.Name === flightNumber)
    }
  }

  onMount(async () => {
    $authStore.user.getIdToken(true).then(token => {
      console.log(token)
      get('http://localhost:3001/api/v1/flight/pastFlights', token).then(
        data => {
          flights = data
          flightsLoaded = true
        },
      )
    })
  })

  function goBack() {
    goto('/admin/overviewFlights')
  }
</script>

<body>
  <section class="bg-image-mainpage bg-cover w-full h-auto bg-bottom py-36">
    <form
      class="flex justify-center w-3/4 lg:w-3/5 xl:w-1/2 mx-auto"
      on:submit|preventDefault={handleSubmit}
    >
      <div class="bg-white rounded-l-xl col-span-2 flex">
        <input
          type="text"
          bind:value={flightNumber}
          placeholder="Search flight number"
          class="p-4 rounded-l-xl"
        />
      </div>
      <button
        class="bg-forest-green text-white font-bold text-2xl p-4 rounded-r-xl hover:bg-cyprus-green cursor-pointer"
      >
        Search
      </button>
    </form>
  </section>

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
  <section class="m-4 px-6">
    <Intertitle titleName="Reviews" />
    <div class="max-h-1/2 overflow-x-hidden overflow-y-scroll custom-scroll">

  {#if searchIsActive}
    {#if specificFlightData}
      <FlightList flightData = {specificFlightData} review={true} />
    {:else}
      <div class='flex justify-center m-8'>
        <h1 class="text-lg font-bold text-forest-green">No flights found</h1>
      </div>
    {/if}
  {:else}
  {#if flightsLoaded}
    {#each flights as flight}
      <FlightList flightData = {flight} review={true} />
    {/each}
    {:else}
      <Spinner />
    {/if}
  {/if}
</div>

  {#if searchIsActive}
      <div class = 'flex justify-center'>
        <button
        class="flex p-4 justify-center items-center font-bold text-xl text-white bg-forest-green rounded-xl hover:bg-cyprus-green"
        on:click={() => {
          flightNumber = ''
          searchIsActive = false;
          specificFlightData = null
        }}
      >
        Show all flights
      </button>
      </div>
    {/if}
</body>

<style>
  .custom-scroll::-webkit-scrollbar {
    width: 0.25rem;
    cursor: pointer;
  }
  .custom-scroll::-webkit-scrollbar-track {
    background-color: rgb(104, 104, 104, 0.2);
    cursor: pointer;
  }
  .custom-scroll::-webkit-scrollbar-thumb {
    cursor: pointer;
    background-color: #686868;
    border: 2px solid #686868;
    border-radius: 50px;
  }
</style>
