<script lang="ts">
  import Intertitle from '../../components/Intertitle.svelte'
  import SearchFlightNumberComponent from '../../components/adminComponents/SearchFlightNumberComponent.svelte'
  import { onMount } from 'svelte'
  import { get } from '../../utils/useApi'
  import BookingFlight from '../../components/bookingOverviewComponents/bookingFlight.svelte'
  import Spinner from '../../components/animations/spinner.svelte'
  import { goto } from '$app/navigation'

  let flights: any = []
  let flightsLoaded: boolean = false
  let specificFlightData: any
  let flightNumber: string = null

  function handleSubmit() {
    getSpecific()
  }
  async function getSpecific() {
    // console.log('start call')
    specificFlightData = await get(
      `http://localhost:3001/api/v1/flight/flightnr/${flightNumber}`,
    )
  }

  onMount(async () => {
    flights = await get('http://localhost:3001/api/v1/flight/allupcoming')
    // console.log(flights)
    flightsLoaded = true
  })

  function addFlight() {
    goto('/admin/createFlight')
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
  <section class="m-4 md:px-6 flex gap-4">
    <button
      class="flex p-4 justify-center items-center font-bold text-xl text-white bg-forest-green rounded-xl hover:bg-cyprus-green"
      on:click={addFlight}
    >
      Add a flight
    </button>
    {#if specificFlightData}
      <button
        class="flex p-4 justify-center items-center font-bold text-xl text-white bg-forest-green rounded-xl hover:bg-cyprus-green"
        on:click={() => {
          specificFlightData = null
        }}
      >
        Show all flights
      </button>
    {/if}
  </section>
  <section class="m-4 px-6">
    <Intertitle titleName="All upcoming flights" />
    <div class="max-h-1/2 overflow-x-hidden overflow-y-scroll custom-scroll">
      {#if specificFlightData}
        <BookingFlight flightData={specificFlightData} booking={false} />
      {:else if flightsLoaded}
        {#each flights as flight}
          <BookingFlight flightData={flight} booking={false} />
        {/each}
      {:else}
        <Spinner />
      {/if}
    </div>
  </section>
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
