<script lang="ts">
  import Intertitle from '../../components/Intertitle.svelte'
  import type Flight from '../../models/FlightModel.type'
  import { onMount } from 'svelte'
  import { get } from '../../utils/useApi'
  import Spinner from '../../components/animations/spinner.svelte'
  import { goto } from '$app/navigation'
  import authStore from '../../stores/authStore'
  import FlightList from '../../components/adminComponents/flightList.svelte'
  import { AllUpcoming } from './../../stores/allUpcomingStore'

  import { _ } from '../../utils/i18n'
  import { init } from 'svelte-i18n'
  import languageStore from '../../stores/languageStore'

  init({
    fallbackLocale: 'en',
    initialLocale: $languageStore.language,
  })

  let flights: Array<Flight> = []
  let flightsLoaded: boolean = false
  let specificFlightData: Flight
  let flightNumber: string = null
  let searchIsActive: boolean = false
  $AllUpcoming.previousYear = new Date().getFullYear() - 1

  function handleSubmit() {
    if (flightNumber == '') {
      searchIsActive = false
    } else {
      searchIsActive = true

      specificFlightData = flights.find(flight => flight.Name === flightNumber)
    }
  }

  async function getSpecific() {
    flightsLoaded = false
    specificFlightData = await get(`/flight/flightnr/${flightNumber}`)
    flightsLoaded = true
  }

  onMount(async () => {
    $authStore.user.getIdToken(true).then(token => {
      get('/flight/allupcoming', token).then(data => {
        flights = data
        flightsLoaded = true
      })
    })
  })

  function addFlight() {
    goto('/admin/createFlight')
  }

  function addAdmin() {
    goto('/admin/createAdmin')
  }
  function goToReviews() {
    goto('/admin/overviewPastFlights')
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
          placeholder={$_('adminOverview.searchPlace')}
          class="p-4 rounded-l-xl"
        />
      </div>
      <button
        class="bg-forest-green text-white font-bold text-2xl p-4 rounded-r-xl hover:bg-cyprus-green cursor-pointer"
      >
        {$_('adminOverview.searchBtn')}
      </button>
    </form>
  </section>
  <section class="m-4 md:px-6 flex gap-4">
    <button
      class="flex p-4 justify-center items-center font-bold text-xl text-white bg-forest-green rounded-xl hover:bg-cyprus-green"
      on:click={addFlight}
    >
      {$_('adminOverview.button1')}
    </button>
    <button
      class="flex p-4 justify-center items-center font-bold text-xl text-white bg-forest-green rounded-xl hover:bg-cyprus-green"
      on:click={addAdmin}
    >
      {$_('adminOverview.button2')}
    </button>
    <button
      class="flex p-4 justify-center items-center font-bold text-xl text-white bg-forest-green rounded-xl hover:bg-cyprus-green"
      on:click={goToReviews}
    >
      {$_('adminOverview.button3')}
    </button>
  </section>

  <section class="m-4 px-6">
    <Intertitle titleName={$_('adminOverview.title')} />
    <div class="max-h-1/2 overflow-x-hidden overflow-y-scroll custom-scroll">
      {#if searchIsActive}
        {#if specificFlightData}
          <FlightList flightData={specificFlightData} review={false} />
        {:else}
          <div class="flex justify-center m-8">
            <h1 class="text-lg font-bold text-forest-green">
              {$_('adminOverview.noFlights')}
            </h1>
          </div>
        {/if}
      {:else if flightsLoaded}
        {#each flights as flight}
          {#if new Date(flight.Date).getFullYear() <= $AllUpcoming.previousYear}
            <FlightList flightData={flight} review={false} />
          {:else}
            <p class="text-lg">
              {($AllUpcoming.previousYear = new Date(
                flight.Date,
              ).getFullYear())}
            </p>
            <FlightList flightData={flight} review={false} />
          {/if}
        {/each}
      {:else}
        <Spinner />
      {/if}
    </div>

    {#if searchIsActive}
      <div class="flex justify-center">
        <button
          class="flex p-4 justify-center items-center font-bold text-xl text-white bg-forest-green rounded-xl hover:bg-cyprus-green"
          on:click={() => {
            flightNumber = ''
            searchIsActive = false
            specificFlightData = null
          }}
        >
          {$_('adminOverview.allFlights')}
        </button>
      </div>
    {/if}
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
