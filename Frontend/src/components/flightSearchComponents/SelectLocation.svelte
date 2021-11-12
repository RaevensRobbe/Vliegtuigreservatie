<script lang="ts">
  // @ts-nocheck
  import type Dest from './../../models/DestinationModel.type'
  import { FlightStore } from './../../stores/flightStore'
  // export so parent receives the changes
  export let departureCity
  export let departureCountry
  export let toggleDeparture = true
  export let isDeparture

  function showDestination(cityName: string, destinationId: number) {
    departureCity = cityName
    if (isDeparture) {
      $FlightStore.departureCountry = departureCountry
      $FlightStore.departureCity = departureCity
      $FlightStore.departureLocationId = destinationId
    } else {
      $FlightStore.destinationCountry = departureCountry
      $FlightStore.destinationCity = departureCity
      $FlightStore.destinationLocationId = destinationId
    }

    toggleDeparture = false
  }

  export let destinationsArray: Dest
</script>

<div
  class="absolute {isDeparture ? 'top-18' : 'top-38 md:top-18'} z-10 w-full "
>
  <div class="flex flex-col align-center">
    <div
      class="w-6 overflow-hidden inline-block {isDeparture
        ? 'self-center ml-0 md:self-start md:ml-10'
        : 'self-center mr-0 md:self-end md:mr-10'} "
    >
      <div
        class=" h-4 w-4 bg-ghost-white {isDeparture
          ? 'md:bg-ghost-white'
          : 'md:bg-white'} rotate-45 transform origin-bottom-left shadow-lg"
      />
    </div>
    <div
      class="grid grid-rows-1 md:grid-cols-5 rounded-xl bg-white-500 shadow-lg flex-grow"
    >
      <!-- Choose country -->
      <div class="bg-ghost-white p-4 md:rounded-l-xl  md:col-span-4">
        <h1 class="font-bold text-forest-green text-xl mb-2">
          Choose a country
        </h1>
        <div class="grid md:grid-cols-4 grid-flow-row grid-rows-4 gap-1">
          {#each destinationsArray as destination}
            <!-- Set departure city = null => otherwise city in wrong country -->
            <div
              class="hover:bg-gray-300"
              on:click={() => (
                (departureCountry = destination.Name), (departureCity = null)
              )}
            >
              <label key={destination.CountryId}>
                <!-- bind:group makes chosen country bold -->
                <input
                  type="radio"
                  name="country"
                  id={destination.CountryId}
                  value={destination.Name}
                  class="peer hidden"
                  bind:group={departureCountry}
                />
                <p class="peer-checked:font-bold">{destination.Name}</p>
              </label>
            </div>
          {/each}
        </div>
      </div>
      <!-- Choose airport -->
      <div class="p-4 bg-white rounded-b-lg md:rounded-r-lg md:rounded-bl-none">
        <h1 class="font-bold mb-2 text-forest-green">Pick an airport</h1>
        {#if !departureCountry}
          <p>Pick a country first</p>
        {:else}
          {#each destinationsArray as destination}
            <!-- If chosen country -->
            {#if destination.Name == departureCountry}
              <!-- Loop city/airport in chosen country -->
              {#each destination.Dest as city}
                <div
                  class="hover:bg-gray-300"
                  on:click={() =>
                    showDestination(city.Name, city.DestinationId)}
                >
                  <label key={city.DestinationId}>
                    <!-- bind:group makes chosen city bold -->
                    <input
                      type="radio"
                      name="city"
                      id={city.DestinationId}
                      value={city.Name}
                      class="peer hidden"
                      bind:group={departureCity}
                    />
                    <p class="peer-checked:font-bold">{city.Name}</p>
                  </label>
                </div>
              {/each}
            {/if}
          {/each}
        {/if}
      </div>
    </div>
  </div>
</div>
