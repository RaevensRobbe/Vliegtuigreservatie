<script lang="ts">
  import { goto } from '$app/navigation'
  import { get, put, del } from '../../utils/useApi'
  import { onMount } from 'svelte'
  import { fade } from 'svelte/transition'
  import { editStore } from '../../stores/editStore'

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

  let flightData: any = $editStore[0]
  console.log($editStore)

  let flightName: string = flightData.Name
  let plane: string = flightData.PlaneId
  let gate: number = flightData.Gate
  let departureAirport: string = flightData.StartId
  let destinationAirport: string = flightData.DestinationId
  let isoDate: string = flightData.Date
  console.log(isoDate)
  let date = isoDate.split('T')[0]
  console.log(date)
  let time = isoDate.split('T')[1]
  time = time.slice(0, time.length - 8)
  console.log(time)

  let price: number = flightData.Price

  let succes: boolean = false
  let submitted: boolean = false
  let failed: boolean = false
  let delFlight: boolean = false
  let departureTime
  let planes: any
  let locations: any

  let loaded: boolean = false

  let errors: any = {}

  onMount(async () => {
    locations = await get('http://localhost:3001/api/v1/destination/all')
    planes = await get('http://localhost:3001/api/v1/plane/all')
    loaded = true
    console.log(flightData.FlightId)
  })

  function handleSubmit() {
    departureTime = new Date(date + 'T' + time)
    console.log(departureTime)
    if (
      requiredNumber(gate) &&
      requiredValidator(departureTime.toString()) &&
      requiredNumber(price)
    ) {
      submitted = false
      failed = true
      errors.gate = 'Gate is required'
      errors.departureTime = 'Departure time is required'
      errors.price = 'Price is required'
      return
    }

    if (requiredNumber(gate)) {
      submitted = false
      failed = true
      errors.gate = 'Gate is required'
      return
    } else if (!checkNumber(gate)) {
      submitted = false
      failed = true
      errors.gate = 'Gate has to be a number'
    } else {
      submitted = false
      failed = true
      errors.gate = ''
    }

    if (requiredValidator(departureTime.toString())) {
      submitted = false
      failed = true
      errors.departureTime = 'Departure time is required'
      return
    } else if (dateValidator(departureTime) === false) {
      submitted = false
      failed = true
      errors.departureTime = "Departure time can't be in the past"
    } else {
      submitted = false
      failed = true
      errors.departureTime = ''
    }

    if (requiredNumber(price)) {
      submitted = false
      failed = true
      errors.price = 'Price is required'
      return
    } else if (!checkNumber(price)) {
      submitted = false
      failed = true
      errors.price = 'Price has to be a number with a . as seperator'
      return
    } else {
      submitted = false
      failed = true
      errors.price = ''
    }
    addToDB()
  }

  async function addToDB() {
    $authStore.user.getIdToken(true).then(token => {
      console.log(token)
      UpdateFlight(token)
    })
    submitted = false
  }

  const UpdateFlight = async token => {
    submitted = true
    let data = {
      date: departureTime,
      price: price,
      gate: gate,
    }
    console.log(data)
    const result = await put(
      `http://localhost:3001/api/v1/flight/updateFlight/${flightData.FlightId}`,
      data,
      token,
    )
    submitted = false
    if (result.success) {
      //Robbe fix loading dingkie
      succes = true
      console.log('Yeey')
    } else {
      //Robbe fix error
      failed = true
      console.log('Neey')
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
      <form in:fade>
        <section
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-white shadow-md w-3/4 mx-auto p-4"
        >
          <!-- Flight name -->
          <div class="flex flex-col">
            <label for="flightName" class="font-bold"> Flight name </label>
            <div
              class="border-b-2 border-t-2 text-gray-200 mb-2 border-current"
            >
              <input
                bind:value={flightName}
                id="flightName"
                type="text"
                placeholder="Enter flightname here"
                class="w-full py-1 pl-2 bg-gray-200 cursor-not-allowed text-sm md:text-md text-dim-gray"
                readonly
              />
            </div>
          </div>
          <!-- Plane -->
          <div class="flex flex-col">
            <label for="plane" class="font-bold"> Plane </label>
            <select
              id="plane"
              bind:value={plane}
              class="border-2 w-full text-sm md:text-md mb-2 py-1 bg-gray-200 cursor-not-allowed"
              readonly={true}
            >
              {#each planes as specificPlane}
                {#if specificPlane.PlaneId == plane}
                  <option
                    value={specificPlane.PlaneId}
                    selected
                    disabled
                    class="bg-gray-100"
                  >
                    {specificPlane.Type}
                  </option>
                {/if}
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
              class="border-2 w-full text-sm md:text-md mb-2 py-1 bg-gray-200 cursor-not-allowed"
              readonly
            >
              <option
                value={flightData.StartId}
                selected
                disabled
                class="bg-gray-100"
              >
                {flightData.Start.Name}
              </option>
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
              class="border-2 w-full text-sm md:text-md mb-2 py-1 bg-gray-200 cursor-not-allowed"
            >
              <option
                value={flightData.DestinationId}
                selected
                disabled
                class="bg-gray-100"
              >
                {flightData.Destination.Name}
              </option>
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
              <input type="date" bind:value={date} />
              <input type="time" bind:value={time} />
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
              {#if delFlight}Flight deletion failed please try again
              {:else}
                Flight edit failed please try again
              {/if}
            </p>
          {/if}
          <div class="flex gap-4 justify-center">
            <button
              on:click={handleSubmit}
              type="button"
              class="flex p-4 mt-4 justify-center items-center font-bold text-2xl text-white bg-forest-green rounded-xl hover:bg-cyprus-green"
            >
              Edit flight
            </button>
            <!-- <button
              on:click={deleteFlight}
              class="flex p-4 mt-4 justify-center items-center font-bold text-2xl text-white bg-red-500 rounded-xl hover:bg-red-700"
            >
              Delete flight
            </button> -->
          </div>
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
        <p class="text-lg lg:text-2xl">
          {#if delFlight}Flight succefully deleted
          {:else}
            Flight succesfully edited
          {/if}
        </p>
        <div class="flex flex-col md:flex-row md:gap-4">
          <button
            class="flex p-4 mx-auto mt-4 justify-center items-center font-bold text-md lg:text-2xl text-white bg-forest-green rounded-xl hover:bg-cyprus-green"
            on:click={goBack}>Go back</button
          >
        </div>
      </div>
    </section>
  {/if}
</div>
