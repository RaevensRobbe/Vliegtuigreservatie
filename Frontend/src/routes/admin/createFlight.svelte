<script lang="ts">
  import { goto } from '$app/navigation'
  import { get } from '../../utils/useApi'
  import { onMount } from 'svelte'

  import Intertitle from '../../components/Intertitle.svelte'
  import Spinner from '../../components/animations/spinner.svelte'
  let flightName: string
  let plane: string
  let gate: number
  let departureAirport: string
  let destinationAirport: string
  let departureTime
  let price: number
  let highSeason: boolean

  let planes: any
  let locations: any

  let loaded: boolean = false

  onMount(async () => {
    locations = await get('http://localhost:3001/api/v1/destination/all')
    planes = await get('http://localhost:3001/api/v1/plane/all')
    console.log(planes)
    console.log(locations)
    loaded = true
  })

  function handleSubmit() {
    console.log(`Flightname: ${flightName}`)
    console.log(`plane: ${plane}`)
    console.log(`gate: ${gate}`)
    console.log(`departureAirport: ${departureAirport}`)
    console.log(`destinationAirport: ${destinationAirport}`)
    console.log(`destinationAirport: ${destinationAirport}`)
    console.log(`price: ${price}`)
    console.log(`highSeason: ${highSeason}`)
  }

  function goBack() {
    goto('/admin/overviewFlights')
  }
</script>

<div class="m-4 px-6 ">
  <section
    class="pb-4 flex hover:cursor-pointer hover:font-bold"
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
  <Intertitle titleName="Add a new flight" />
  {#if loaded}
    <form on:submit|preventDefault={handleSubmit}>
      <section
        class="grid grid-cols-3 gap-4 bg-white shadow-md w-3/4 mx-auto p-4"
      >
        <!-- Flight name -->
        <div class="flex flex-col">
          <label for="flightName" class="font-bold"> Flight name </label>
          <div class="border-b text-dim-gray mb-2 border-current">
            <input
              bind:value={flightName}
              id="flightName"
              type="text"
              placeholder="Enter flightname here"
              class="w-full focus:outline-none py-1 focus:ring focus:ring-forest-green text-sm md:text-md"
            />
          </div>
        </div>
        <!-- Plane -->
        <div class="flex flex-col justify-between">
          <label for="plane" class="font-bold"> Plane </label>
          <select
            id="plane"
            bind:value={plane}
            class="border-2 w-full text-sm md:text-md mb-2"
            required
          >
            <option value="null" selected disabled class="bg-gray-100"
              >Select the plane</option
            >
            {#each planes as specificPlane}
              <option value={specificPlane.Type}>
                {specificPlane.Type}
              </option>
            {/each}
          </select>
        </div>
        <!-- Gate -->
        <div class="flex flex-col">
          <label for="gate" class="font-bold"> Gate </label>
          <div class="border-b text-dim-gray mb-2 border-current">
            <input
              bind:value={gate}
              id="gate"
              type="number"
              placeholder="Enter Gate number here"
              class="w-full focus:outline-none py-1 focus:ring focus:ring-forest-green text-sm md:text-md"
            />
          </div>
        </div>
        <!-- Departure airport -->
        <div class="flex flex-col justify-between">
          <label for="departureAirport" class="font-bold">
            Departure airport
          </label>
          <select
            id="departureAirport"
            bind:value={departureAirport}
            class="border-2 w-full text-sm md:text-md mb-2"
            required
          >
            <option value="null" selected disabled class="bg-gray-100"
              >Select the airport</option
            >
            {#each locations as location}
              <option value={location.DestinationId}>
                {location.Name}
              </option>
            {/each}
          </select>
        </div>
        <!-- Destination airport -->
        <div class="flex flex-col justify-between">
          <label for="departureAirport" class="font-bold">
            Destination airport
          </label>
          <select
            id="departureAirport"
            bind:value={destinationAirport}
            class="border-2 w-full text-sm md:text-md mb-2"
            required
          >
            <option value="null" selected disabled class="bg-gray-100"
              >Select the airport</option
            >
            {#each locations as location}
              <option value={location.DestinationId}>
                {location.Name}
              </option>
            {/each}
          </select>
        </div>
        <div class="flex flex-col">
          <label for="departureTime" class="font-bold"> Departure time </label>
          <div class="border-b text-dim-gray mb-2 border-current">
            <input
              bind:value={departureTime}
              id="departureTime"
              type="datetime-local"
              class="w-full focus:outline-none py-1 focus:ring focus:ring-forest-green text-sm md:text-md"
            />
          </div>
        </div>
        <div class="flex flex-col">
          <label for="price" class="font-bold"> Price </label>
          <div class="border-b text-dim-gray mb-2 border-current">
            <div class="flex">
              <span class="text-sm md:text-md mr-2 py-1">€ </span>
              <input
                bind:value={price}
                id="price"
                type="numeric"
                placeholder="Enter the price here"
                class="w-full focus:outline-none py-1 focus:ring focus:ring-forest-green text-sm md:text-md"
              />
            </div>
          </div>
          <label for="HighSeason" class="text-xs">
            <input type="checkbox" id="HighSeason" bind:checked={highSeason} /> HighSeason
            (price * 1.75)
          </label>
        </div>
      </section>
      <button
        type="submit"
        class="flex p-4 mx-auto mt-4 justify-center items-center font-bold text-2xl text-white bg-forest-green rounded-xl hover:bg-cyprus-green"
      >
        Add flight
      </button>
    </form>
  {:else}
    <div class="w-full h-full flex justify-center my-auto col-span-full">
      <Spinner />
    </div>
  {/if}
</div>
