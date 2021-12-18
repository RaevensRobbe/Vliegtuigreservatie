<script lang="ts">
  //@ts-nocheck
  import { onMount } from 'svelte'
  import { get } from '../utils/useApi'
  import { FlightStore } from '../stores/FlightStore'
  import SelectLocation from './flightSearchComponents/SelectLocation.svelte'
  import SelectTravelers from './flightSearchComponents/SelectTravelers.svelte'
  import { goto } from '$app/navigation'

  import { _ } from '../utils/i18n'
  import { init } from 'svelte-i18n';
  
  init({
      fallbackLocale: 'en',
      initialLocale: 'en',
    })

  let flight = $FlightStore

  // set today date => check if departure date
  let today: string = new Date().toISOString().split('T')[0]

  //toggle states => show item when true
  let toggleTravelers: boolean = false
  let toggleDestination: boolean = false
  let toggleDeparture: boolean = false

  //default set what's in storage
  let children: number = flight.children
  let adults: number = flight.adults

  //dates of flights
  let departureDate: Date = flight.departureDate
  let retourDate: Date = flight.retourDate

  //departure and destination city and country
  let departureCity: string = flight.departureCity
  let departureCountry: string = flight.departureCountry
  let destinationCity: string = flight.destinationCity
  let destinationCountry: string = flight.destinationCountry

  //object errors add errors in here otherwise delete them
  let errors: any = {}

  let destinationsArray: Dest = []

  onMount(async () => {
    destinationsArray = await get(
      'http://localhost:3001/api/v1/country/countries/destinations',
    )
  })

  function showItem(item: string) {
    switch (item) {
      case 'travelers':
        toggleTravelers = !toggleTravelers
        toggleDeparture = false
        toggleDestination = false
        break
      case 'departure':
        toggleDeparture = !toggleDeparture
        toggleTravelers = false
        toggleDestination = false
        break
      case 'destination':
        toggleDestination = !toggleDestination
        toggleTravelers = false
        toggleDeparture = false
        break
    }
  }

  function flightValidator() {
    //Check if there is a departure location set
    if (!$FlightStore.departureCity) {
      errors.departureCity = 'No departure location set'
    } else delete errors['departureCity']

    //Check if there is a destination location set or if it isnt the same as departure location
    if (!$FlightStore.destinationCity) {
      errors.destinationCity = 'No destination location set'
    } else if (
      $FlightStore.departureLocationId == $FlightStore.destinationLocationId
    ) {
      errors.destinationCity =
        "Destination can't be the same as departure location"
    } else delete errors['destinationCity']

    //Check if there is a departure date set or not older / the same as today
    if (!$FlightStore.departureDate) {
      errors.departureDate = 'No departure date set'
    } else if ($FlightStore.departureDate <= today) {
      errors.departureDate = "Departure can't be today or in the past"
    } else delete errors['departureDate']

    //Check if there is a retour date => if so check if it is later than departure date
    if ($FlightStore.retourDate) {
      if ($FlightStore.departureDate > $FlightStore.retourDate) {
        errors.retourDate = 'Retour date cant be before your departure'
      } else if ($FlightStore.departureDate == $FlightStore.retourDate) {
        errors.retourDate = 'Retour date cant be the same as departure date'
      } else delete errors['retourDate']
    }

    //Check if there are passengers
    if ($FlightStore.children == 0 && $FlightStore.adults == 0) {
      errors.passengers = 'You need at least one passenger'
    } else delete errors['passengers']

    //if no errors then you can go to the next page
    if (Object.keys(errors).length === 0) {
      goto('/flight/flightDate')
    }
  }

  const handleSubmit = () => {
    // set all toggles false
    toggleTravelers = false

    //! voor te testen hardcoded moet nog dynamisch gezet worden
    $FlightStore.departureDate = departureDate
    $FlightStore.retourDate = retourDate
    $FlightStore.children = children
    $FlightStore.adults = adults

    //go to next page in validator
    flightValidator()
  }
</script>

<main class="flex justify-center">
  <!-- svelte-ignore component-name-lowercase -->
  <form
    class="flex flex-col justify-between gap-4 w-3/4 lg:w-3/5 xl:w-1/2"
    on:submit|preventDefault={handleSubmit}
  >
    <div class="grid relative grid-cols-1 bg-white rounded-xl lg:grid-cols-2">
      <!--upper row -->
      <div class="flex flex-col p-4 border-b-2 lg:border-r-2 lg:border-b-0">
        <!--departure box -->
        <p class="font-light text-xs">{$_('flightSearch.from')}</p>
        <div
          class="flex mt-1 cursor-pointer"
          on:click={() => showItem('departure')}
        >
          <svg
            id="flight_takeoff_black_24dp"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            class="fill-current text-forest-green mr-2 h-6 w-6"
          >
            <path
              id="Path_13"
              data-name="Path 13"
              d="M0,0H32V32H0Z"
              fill="none"
            />
            <path
              id="Path_14"
              data-name="Path 14"
              d="M2.76,26.082h26.5V29H2.76ZM30.05,12.426a2.079,2.079,0,0,0-2.566-1.547l-7.4,2.072L10.458,3.57l-2.691.744L13.54,14.775l-6.931,1.94L3.862,14.469l-2.022.569,3.612,6.551,23.106-6.463a2.234,2.234,0,0,0,1.492-2.7Z"
              transform="translate(0 0)"
            />
          </svg>
          {#if !departureCountry}
            <span>{$_('flightSearch.departure')}</span>
          {:else if !departureCity}
            <span>{departureCountry}</span>
          {:else}
            <span>{departureCountry}, {departureCity}</span>
          {/if}
        </div>
        {#if errors.departureCity}
          <p class="text-red-500 text-sm">{errors.departureCity}</p>
        {/if}
      </div>
      <div class="flex flex-col p-4">
        <!--destination box -->
        <p class="font-light text-xs">{$_('flightSearch.to')}</p>
        <div
          class="flex mt-1 cursor-pointer"
          on:click={() => showItem('destination')}
        >
          <svg
            id="flight_land_black_24dp"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            class="fill-current text-forest-green mr-2 h-6 w-6"
          >
            <path
              id="Path_11"
              data-name="Path 11"
              d="M0,0H32V32H0Z"
              fill="none"
            />
            <path
              id="Path_12"
              data-name="Path 12"
              d="M2.5,26.158h27V29H2.5Zm23.931-4.476a2.134,2.134,0,0,0,1.108-4.121l-7.546-2.018L16.071,2.725,13.328,2V13.766l-7.063-1.89-1.322-3.3L2.884,8.025v7.347Z"
              transform="translate(0 0)"
            />
          </svg>
          {#if !destinationCountry}
            <span>{$_('flightSearch.destination')}</span>
          {:else if !destinationCity}
            <span>{destinationCountry}</span>
          {:else}
            <span>{destinationCountry}, {destinationCity}</span>
          {/if}
        </div>
        {#if errors.destinationCity}
          <p class="text-red-500 text-sm">{errors.destinationCity}</p>
        {/if}
      </div>
      {#if toggleDeparture}
        <SelectLocation
          bind:departureCity
          bind:departureCountry
          bind:toggleDeparture
          bind:destinationsArray
          isDeparture={true}
        />
      {:else if toggleDestination}
        <SelectLocation
          bind:departureCity={destinationCity}
          bind:departureCountry={destinationCountry}
          bind:toggleDeparture={toggleDestination}
          bind:destinationsArray
          isDeparture={false}
        />
      {/if}
    </div>
    <div class="grid grid-cols-1 2xl:grid-cols-11 bg-white rounded-xl">
      <!-- lower row -->
      <div
        class="flex flex-col 2xl:col-span-3 p-4 border-b-2 border-r-0 2xl:border-b-0 2xl:border-r-2 sm:border-b-2"
      >
        <!--departure date box -->
        <p class="font-light text-xs">{$_('flightSearch.departure')}</p>
        <div class="mt-1 flex">
          <svg
            id="calendar"
            class="fill-current text-forest-green mr-2 h-6 w-6 self-center"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 27 27"
          >
            <path
              id="Path_4"
              data-name="Path 4"
              d="M12,13.5a1.5,1.5,0,0,0,0,3H24a1.5,1.5,0,0,0,0-3Z"
              transform="translate(-4.5 -4.5)"
            />
            <path
              id="Path_5"
              data-name="Path 5"
              d="M9,4.5A4.5,4.5,0,0,0,4.5,9V27A4.5,4.5,0,0,0,9,31.5H27A4.5,4.5,0,0,0,31.5,27V9A4.5,4.5,0,0,0,27,4.5ZM7.5,27V10.5h21V27A1.5,1.5,0,0,1,27,28.5H9A1.5,1.5,0,0,1,7.5,27Z"
              transform="translate(-4.5 -4.5)"
              fill-rule="evenodd"
            />
          </svg>
          <div class="flex-grow">
            <input type="date" bind:value={departureDate} />
          </div>
        </div>
        {#if errors.departureDate}
          <p class="text-red-500 text-sm">{errors.departureDate}</p>
        {/if}
      </div>
      <div
        class="flex flex-col 2xl:col-span-3 p-4 border-b-2 2xl:border-b-0 2xl:border-r-2 2xl:border-gray-200 sm:border-b-2"
      >
        <!--retour date box -->
        <p class="font-light text-xs">{$_('flightSearch.retour')}</p>
        <div class="flex mt-1">
          <svg
            id="calendar"
            class="fill-current text-forest-green mr-2 h-6 w-6 self-center"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 27 27"
          >
            <path
              id="Path_4"
              data-name="Path 4"
              d="M12,13.5a1.5,1.5,0,0,0,0,3H24a1.5,1.5,0,0,0,0-3Z"
              transform="translate(-4.5 -4.5)"
            />
            <path
              id="Path_5"
              data-name="Path 5"
              d="M9,4.5A4.5,4.5,0,0,0,4.5,9V27A4.5,4.5,0,0,0,9,31.5H27A4.5,4.5,0,0,0,31.5,27V9A4.5,4.5,0,0,0,27,4.5ZM7.5,27V10.5h21V27A1.5,1.5,0,0,1,27,28.5H9A1.5,1.5,0,0,1,7.5,27Z"
              transform="translate(-4.5 -4.5)"
              fill-rule="evenodd"
            />
          </svg>
          <div class="flex-grow">
            <input type="date" bind:value={retourDate} />
          </div>
        </div>
        {#if errors.retourDate}
          <p class="text-red-500 text-sm">{errors.retourDate}</p>
        {/if}
      </div>
      <div class="relative flex flex-col p-4 2xl:col-span-3">
        <!--passenger box -->
        <p class="font-light text-xs">{$_('flightSearch.travelers')}</p>
        <div
          class="flex mt-1 cursor-pointer flex-grow items-center"
          on:click={() => showItem('travelers')}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="fill-current text-forest-green mr-2 h-6 w-6"
            viewBox="0 0 27 25.199"
          >
            <path
              id="group"
              d="M8.339,12.6a4.849,4.849,0,0,0-3.727,1.8H2.728a3.224,3.224,0,0,1-1.94-.569A1.927,1.927,0,0,1,0,12.164Q0,7.2,1.744,7.2a2.7,2.7,0,0,1,.612.3,9.27,9.27,0,0,0,1.371.6A4.932,4.932,0,0,0,5.4,8.4a5.655,5.655,0,0,0,1.87-.323A7,7,0,0,0,7.2,9a6.192,6.192,0,0,0,1.139,3.6ZM23.4,21.557a3.5,3.5,0,0,1-1.027,2.665,3.793,3.793,0,0,1-2.728.977H7.354a3.791,3.791,0,0,1-2.728-.977A3.507,3.507,0,0,1,3.6,21.557q0-.745.049-1.456a14.363,14.363,0,0,1,.2-1.533,12,12,0,0,1,.372-1.525,7.184,7.184,0,0,1,.6-1.371,4.966,4.966,0,0,1,.871-1.139,3.656,3.656,0,0,1,1.2-.752A4.228,4.228,0,0,1,8.465,13.5a1.652,1.652,0,0,1,.6.3q.463.3,1.027.675a6.177,6.177,0,0,0,1.5.675,6.527,6.527,0,0,0,5.3-.675q.563-.373,1.027-.675a1.652,1.652,0,0,1,.6-.3,4.224,4.224,0,0,1,1.568.281,3.667,3.667,0,0,1,1.2.752,4.939,4.939,0,0,1,.871,1.139,7.247,7.247,0,0,1,.6,1.371,11.912,11.912,0,0,1,.373,1.525,14.363,14.363,0,0,1,.2,1.533q.049.71.049,1.456ZM9,3.6A3.47,3.47,0,0,1,7.945,6.145,3.465,3.465,0,0,1,5.4,7.2,3.472,3.472,0,0,1,2.854,6.145,3.467,3.467,0,0,1,1.8,3.6,3.467,3.467,0,0,1,2.854,1.054,3.472,3.472,0,0,1,5.4,0,3.465,3.465,0,0,1,7.945,1.054,3.47,3.47,0,0,1,9,3.6ZM18.9,9a5.2,5.2,0,0,1-1.582,3.818A5.2,5.2,0,0,1,13.5,14.4a5.207,5.207,0,0,1-3.818-1.582A5.2,5.2,0,0,1,8.1,9,5.2,5.2,0,0,1,9.681,5.182,5.207,5.207,0,0,1,13.5,3.6a5.2,5.2,0,0,1,3.818,1.582A5.2,5.2,0,0,1,18.9,9ZM27,12.164a1.928,1.928,0,0,1-.787,1.666,3.217,3.217,0,0,1-1.94.569H22.388a4.849,4.849,0,0,0-3.727-1.8A6.192,6.192,0,0,0,19.8,9a7,7,0,0,0-.07-.928,5.655,5.655,0,0,0,1.87.323,4.937,4.937,0,0,0,1.673-.3,9.223,9.223,0,0,0,1.371-.6,2.675,2.675,0,0,1,.612-.3Q27,7.2,27,12.163ZM25.2,3.6a3.47,3.47,0,0,1-1.054,2.545,3.6,3.6,0,0,1-5.091,0A3.467,3.467,0,0,1,18,3.6a3.467,3.467,0,0,1,1.054-2.545,3.6,3.6,0,0,1,5.091,0A3.47,3.47,0,0,1,25.2,3.6Z"
            />
          </svg>
          <span>{adults} {$_('flightSearch.adults')}, {children} {$_('flightSearch.children')}</span>
        </div>
        {#if toggleTravelers}
          <SelectTravelers bind:children bind:adults bind:toggleTravelers />
        {/if}
        {#if errors.passengers}
          <p class="text-red-500 text-sm">{errors.passengers}</p>
        {/if}
      </div>
      <button
        type="submit"
        class="flex 2xl:col-span-2 p-4 justify-center items-center font-bold text-2xl text-white bg-forest-green rounded-b-xl xl:rounded-b-xl 2xl:rounded-b-none 2xl:rounded-r-xl hover:bg-cyprus-green"
      >
        <!--submit button -->
        {$_('flightSearch.search')}
      </button>
    </div>
  </form>
</main>
