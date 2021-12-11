<script lang="ts">
  import { goto } from '$app/navigation'
  import { get, post } from '../../utils/useApi'
  import { onMount } from 'svelte'
  import { fade, scale, draw } from 'svelte/transition'
  import { quintOut } from 'svelte/easing'

  import Intertitle from '../../components/Intertitle.svelte'
  import Spinner from '../../components/animations/spinner.svelte'
  import authStore from '../../stores/authStore'

  import {
    requiredValidator,
    emailValidator,
    strenghtValidator,
    confirmValidator,
    checkNumber,
    dateValidator,
    requiredNumber,
  } from '../../utils/inputValidator'
  import authStore from '../../stores/authStore'

  let flightName: string
  let plane: string
  let gate: number = null
  let departureAirport: string
  let destinationAirport: string
  let departureTime
  let price: number = null
  let highSeason: boolean = false

  let succes: boolean = false
  let submitted: boolean = false
  let failed: boolean = false

  let planes: any
  let locations: any

  let loaded: boolean = false

  let errors: any = {}

  onMount(async () => {
    locations = await get('http://localhost:3001/api/v1/destination/all')
    planes = await get('http://localhost:3001/api/v1/plane/all')

    loaded = true
  })

  function addAnotherFlight() {
    succes = false
    flightName = null
    plane = null
    gate = null
    departureAirport = null
    destinationAirport = null
    departureTime = null
    price = null
    highSeason = null
    submitted = false
  }

  function handleSubmit() {
    if (
      requiredValidator(flightName) &&
      requiredValidator(plane) &&
      requiredNumber(gate) &&
      requiredValidator(departureAirport) &&
      requiredValidator(destinationAirport) &&
      requiredValidator(departureTime) &&
      requiredNumber(price)
    ) {
      errors.flightName = 'Flight name is required'
      errors.plane = 'Plane is required'
      errors.gate = 'Gate is required'
      errors.departureAirport = 'Departure airport is required'
      errors.destinationAirport = 'Destination airport is required'
      errors.departureTime = 'Departure time is required'
      errors.price = 'Price is required'
      return
    }

    if (requiredValidator(flightName)) {
      errors.flightName = 'Flight name is required'
      return
    } else {
      errors.flightName = ''
    }

    if (requiredValidator(plane)) {
      errors.plane = 'Plane is required'
      return
    } else {
      errors.plane = ''
    }

    if (requiredNumber(gate)) {
      errors.gate = 'Gate is required'
      return
    } else if (!checkNumber(gate)) {
      errors.gate = 'Gate has to be a number'
    } else {
      errors.gate = ''
    }

    if (requiredValidator(departureAirport)) {
      errors.departureAirport = 'Departure airport is required'
      return
    } else {
      errors.departureAirport = ''
    }

    if (requiredValidator(destinationAirport)) {
      errors.destinationAirport = 'Destination airport is required'
      return
    } else if (
      confirmValidator(departureAirport, destinationAirport) === true
    ) {
      errors.destinationAirport =
        "Destination and departure airport can't be the same"
    } else {
      errors.destinationAirport = ''
    }

    if (requiredValidator(departureTime)) {
      errors.departureTime = 'Departure time is required'
      return
    } else if (dateValidator(departureTime) === false) {
      errors.departureTime = "Departure time can't be in the past"
    } else {
      errors.departureTime = ''
    }

    if (requiredNumber(price)) {
      errors.price = 'Price is required'
      return
    } else if (!checkNumber(price)) {
      errors.price = 'Price has to be a number with a . as seperator'
      return
    } else {
      errors.price = ''
    }
    addToDB()
  }

  async function addToDB() {
    $authStore.user.getIdToken(true).then(token => {
      AddFlight(token)
    })
  }

  const AddFlight = async token => {
    submitted = true
    if (highSeason) {
      price = price * 1.75
    }
    let data = {
      Name: flightName,
      PlaneId: plane,
      DestinationId: destinationAirport,
      StartId: departureAirport,
      Date: departureTime,
      Price: price,
      Gate: gate,
    }

    let call: any = await post(
      'http://localhost:3001/api/v1/flight',
      data,
      token,
    )
    console.log(call)

    if (call.success === true) {
      succes = true
    } else {
      submitted = false
      failed = true
    }
  }

  function goBack() {
    goto('/admin/overviewFlights')
  }
</script>

<div class="m-4 md:px-6 ">
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
  {#if succes === false}
    {#if loaded}
      <form on:submit|preventDefault={handleSubmit} in:fade>
        <section
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-white shadow-md w-3/4 mx-auto p-4"
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
            {#if errors.flightName}
              <p class="text-red-600 -mt-2 mb-2">{errors.flightName}</p>
            {/if}
          </div>
          <!-- Plane -->
          <div class="flex flex-col">
            <label for="plane" class="font-bold"> Plane </label>
            <select
              id="plane"
              bind:value={plane}
              class="border-2 w-full text-sm md:text-md mb-2 py-1"
            >
              <option value="" selected disabled class="bg-gray-100"
                >Select the plane</option
              >
              {#each planes as specificPlane}
                <option value={specificPlane.PlaneId}>
                  {specificPlane.Type}
                </option>
              {/each}
            </select>
            {#if errors.plane}
              <p class="text-red-600 -mt-2 mb-2">{errors.plane}</p>
            {/if}
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
            {#if errors.gate}
              <p class="text-red-600 -mt-2 mb-2">{errors.gate}</p>
            {/if}
          </div>
          <!-- Departure airport -->
          <div class="flex flex-col">
            <label for="departureAirport" class="font-bold">
              Departure airport
            </label>
            <select
              id="departureAirport"
              bind:value={departureAirport}
              class="border-2 w-full text-sm md:text-md mb-2 py-1"
            >
              <option value="" selected disabled class="bg-gray-100"
                >Select the airport</option
              >
              {#each locations as location}
                <option value={location.DestinationId}>
                  {location.Name}
                </option>
              {/each}
            </select>
            {#if errors.departureAirport}
              <p class="text-red-600 -mt-2 mb-2">{errors.departureAirport}</p>
            {/if}
          </div>
          <!-- Destination airport -->
          <div class="flex flex-col">
            <label for="departureAirport" class="font-bold">
              Destination airport
            </label>
            <select
              id="departureAirport"
              bind:value={destinationAirport}
              class="border-2 w-full text-sm md:text-md mb-2 py-1"
            >
              <option value="" selected disabled class="bg-gray-100"
                >Select the airport</option
              >
              {#each locations as location}
                <option value={location.DestinationId}>
                  {location.Name}
                </option>
              {/each}
            </select>
            {#if errors.destinationAirport}
              <p class="text-red-600 -mt-2 mb-2">{errors.destinationAirport}</p>
            {/if}
          </div>
          <!-- Departure time -->
          <div class="flex flex-col">
            <label for="departureTime" class="font-bold">
              Departure time
            </label>
            <div class="border-b text-dim-gray mb-2 border-current">
              <input
                bind:value={departureTime}
                id="departureTime"
                type="datetime-local"
                class="w-full focus:outline-none py-1 focus:ring focus:ring-forest-green text-sm md:text-md"
              />
            </div>
            {#if errors.departureTime}
              <p class="text-red-600 -mt-2 mb-2">{errors.departureTime}</p>
            {/if}
          </div>
          <!-- Price -->
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
              <input
                type="checkbox"
                id="HighSeason"
                bind:checked={highSeason}
              /> HighSeason (price * 1.75)
            </label>
            {#if errors.price}
              <p class="text-red-600 mb-2">{errors.price}</p>
            {/if}
          </div>
        </section>
        {#if submitted}
          <div class="flex p-4 mx-auto mt-4 justify-center items-center">
            <Spinner />
          </div>
        {:else}
          {#if failed}
            <p class="text-red-600 mt-4 flex justify-center">
              Flight add failed please try again
            </p>
          {/if}
          <button
            type="submit"
            class="flex p-4 mx-auto mt-4 justify-center items-center font-bold text-2xl text-white bg-forest-green rounded-xl hover:bg-cyprus-green"
          >
            Add flight
          </button>
        {/if}
      </form>
    {:else}
      <div class="w-full h-full flex justify-center my-auto col-span-full">
        <Spinner />
      </div>
    {/if}
  {:else}
    <section class="bg-white shadow-md w-3/4 mx-auto p-4" in:fade>
      <div class="flex flex-col justify-center items-center gap-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 31.5 31.5"
          class="h-32 w-32 fill-current text-forest-green"
          ><g transform="translate(-2.25 -2.25)">
            <path
              d="M15.75,24.091l-5.625-5.626,1.59-1.59,4.035,4.034,8.533-8.534,1.592,1.592Z"
            /><path
              d="M18,2.25A15.75,15.75,0,1,0,33.75,18,15.75,15.75,0,0,0,18,2.25ZM18,31.5A13.5,13.5,0,1,1,31.5,18,13.5,13.5,0,0,1,18,31.5Z"
            />
          </g></svg
        >
        <p class="text-lg lg:text-2xl">Flight succesfully added</p>
        <div class="flex flex-col md:flex-row md:gap-4">
          <button
            class="flex p-4 mx-auto mt-4 justify-center items-center font-bold text-md lg:text-2xl text-white bg-forest-green rounded-xl hover:bg-cyprus-green"
            on:click={addAnotherFlight}>Add another flight</button
          >
          <button
            class="flex p-4 mx-auto mt-4 justify-center items-center font-bold text-md lg:text-2xl text-white bg-forest-green rounded-xl hover:bg-cyprus-green"
            on:click={goBack}>Go back</button
          >
        </div>
      </div>
    </section>
  {/if}
</div>
