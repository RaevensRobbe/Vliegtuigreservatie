<script lang="ts">
  // @ts-nocheck
  import type Dest from './../../models/DestinationModel.type'
  export let departureCity
  export let departureCountry
  export let toggleDestination

  function showDestination() {
    console.log(toggleDestination)
    toggleDestination = !toggleDestination
  }
  export const destinationsArray: Dest = [
    {
      CountryId: 5,
      Name: 'Belgium',
      Dest: [
        {
          DestinationId: 5,
          Name: 'Springfield',
        },
        {
          DestinationId: 15,
          Name: 'Kansas City',
        },
      ],
    },
    {
      CountryId: 9,
      Name: 'Bulgaria',
      Dest: [
        {
          DestinationId: 9,
          Name: 'Milwaukee',
        },
        {
          DestinationId: 19,
          Name: 'Chicago',
        },
      ],
    },
    {
      CountryId: 6,
      Name: 'Congo',
      Dest: [
        {
          DestinationId: 6,
          Name: 'Charlotte',
        },
        {
          DestinationId: 16,
          Name: 'Oklahoma city',
        },
      ],
    },
    {
      CountryId: 1,
      Name: 'Cuba',
      Dest: [
        {
          DestinationId: 1,
          Name: 'Colorado Springs',
        },
      ],
    },
    {
      CountryId: 2,
      Name: 'El Salvador',
      Dest: [
        {
          DestinationId: 2,
          Name: 'Jacksonville',
        },
        {
          DestinationId: 12,
          Name: 'San Jose',
        },
      ],
    },
    {
      CountryId: 8,
      Name: 'Grenada',
      Dest: [
        {
          DestinationId: 8,
          Name: 'Scottsdale',
        },
        {
          DestinationId: 18,
          Name: 'Paris',
        },
      ],
    },
    {
      CountryId: 7,
      Name: 'Israel',
      Dest: [
        {
          DestinationId: 7,
          Name: 'Honolulu',
        },
        {
          DestinationId: 17,
          Name: 'Bakersfield',
        },
      ],
    },
    {
      CountryId: 10,
      Name: 'Malawi',
      Dest: [
        {
          DestinationId: 10,
          Name: 'Richmond',
        },
        {
          DestinationId: 11,
          Name: 'Santa Ana',
        },
        {
          Name: 'Berlin',
          DestinationId: 20,
        },
      ],
    },
    {
      CountryId: 3,
      Name: 'Romania',
      Dest: [
        {
          DestinationId: 3,
          Name: 'Amarillo',
        },
        {
          DestinationId: 13,
          Name: 'Albuquerque',
        },
      ],
    },
    {
      CountryId: 4,
      Name: 'The Bahamas',
      Dest: [
        {
          DestinationId: 4,
          Name: 'San Bernardino',
        },
        {
          DestinationId: 14,
          Name: 'Norfolk',
        },
      ],
    },
    {
      CountryId: 5,
      Name: 'Belgium',
      Dest: [
        {
          DestinationId: 5,
          Name: 'Springfield',
        },
        {
          DestinationId: 15,
          Name: 'Kansas City',
        },
      ],
    },
    {
      CountryId: 9,
      Name: 'Bulgaria',
      Dest: [
        {
          DestinationId: 9,
          Name: 'Milwaukee',
        },
        {
          DestinationId: 19,
          Name: 'Chicago',
        },
      ],
    },
    {
      CountryId: 6,
      Name: 'Congo',
      Dest: [
        {
          DestinationId: 6,
          Name: 'Charlotte',
        },
        {
          DestinationId: 16,
          Name: 'Oklahoma city',
        },
      ],
    },
    {
      CountryId: 1,
      Name: 'Cuba',
      Dest: [
        {
          DestinationId: 1,
          Name: 'Colorado Springs',
        },
      ],
    },
    {
      CountryId: 2,
      Name: 'El Salvador',
      Dest: [
        {
          DestinationId: 2,
          Name: 'Jacksonville',
        },
        {
          DestinationId: 12,
          Name: 'San Jose',
        },
      ],
    },
    {
      CountryId: 8,
      Name: 'Grenada',
      Dest: [
        {
          DestinationId: 8,
          Name: 'Scottsdale',
        },
        {
          DestinationId: 18,
          Name: 'Paris',
        },
      ],
    },
    {
      CountryId: 7,
      Name: 'Israel',
      Dest: [
        {
          DestinationId: 7,
          Name: 'Honolulu',
        },
        {
          DestinationId: 17,
          Name: 'Bakersfield',
        },
      ],
    },
    {
      CountryId: 10,
      Name: 'Malawi',
      Dest: [
        {
          DestinationId: 10,
          Name: 'Richmond',
        },
        {
          DestinationId: 11,
          Name: 'Santa Ana',
        },
        {
          Name: 'Berlin',
          DestinationId: 20,
        },
      ],
    },
    {
      CountryId: 3,
      Name: 'Romania',
      Dest: [
        {
          DestinationId: 3,
          Name: 'Amarillo',
        },
        {
          DestinationId: 13,
          Name: 'Albuquerque',
        },
      ],
    },
    {
      CountryId: 4,
      Name: 'The Bahamas',
      Dest: [
        {
          DestinationId: 4,
          Name: 'San Bernardino',
        },
        {
          DestinationId: 14,
          Name: 'Norfolk',
        },
      ],
    },
    {
      CountryId: 8,
      Name: 'Grenada',
      Dest: [
        {
          DestinationId: 8,
          Name: 'Scottsdale',
        },
        {
          DestinationId: 18,
          Name: 'Paris',
        },
      ],
    },
    {
      CountryId: 7,
      Name: 'Israel',
      Dest: [
        {
          DestinationId: 7,
          Name: 'Honolulu',
        },
        {
          DestinationId: 17,
          Name: 'Bakersfield',
        },
      ],
    },
    {
      CountryId: 10,
      Name: 'Malawi',
      Dest: [
        {
          DestinationId: 10,
          Name: 'Richmond',
        },
        {
          DestinationId: 11,
          Name: 'Santa Ana',
        },
        {
          Name: 'Berlin',
          DestinationId: 20,
        },
      ],
    },
  ]
  // destinationsArray.forEach(destination => console.log(destination))
</script>

<div class="absolute top-18 justify-center z-10">
  <div class="flex flex-col align-center">
    <div class="w-6 overflow-hidden inline-block self-center">
      <div
        class=" h-4 w-4 bg-ghost-white rotate-45 transform origin-bottom-left"
      />
    </div>
    <div class="flex rounded-xl bg-white-500 shadow-md flex-grow">
      <!-- Choose country -->
      <div class="bg-ghost-white p-4 rounded-l-xl">
        <h1 class="font-bold text-forest-green text-xl mb-2">
          Choose a country
        </h1>
        <div class="grid grid-cols-4 grid-flow-col grid-rows-4 gap-1">
          {#each destinationsArray as destination}
            <div
              class="hover:bg-gray-300"
              on:click={() => (
                (departureCountry = destination.Name), (departureCity = null)
              )}
            >
              <label key={destination.CountryId}>
                <input
                  type="radio"
                  name="country"
                  id={destination.CountryId}
                  value={destination.CountryId}
                  class="peer hidden"
                />
                <p class="peer-checked:font-bold">{destination.Name}</p>
              </label>
            </div>
          {/each}
        </div>
      </div>
      <!-- Choose airport -->
      <div class="p-4 bg-white rounded-r-lg">
        <h1 class="font-bold mb-2">Pick an airport</h1>
        {#if !departureCountry}
          <p>Pick a country first</p>
        {:else}
          {#each destinationsArray as destination}
            {#if destination.Name == departureCountry}
              {#each destination.Dest as city}
                <div
                  class="hover:bg-gray-300"
                  on:click={() => (departureCity = city.Name)}
                >
                  <label key={city.DestinationId}>
                    <input
                      type="radio"
                      name="city"
                      id={city.DestinationId}
                      value={city.DestinationId}
                      class="peer hidden"
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
