<script lang="ts">
  import { queryGraphql } from '../../utils/useApi'

  import type PopularDestination from '../../models/PopularDestinationModel.type'
  import { FlightStore } from '../../stores/flightStore'
  import type PopularDestinationGraphql from '../../models/PopularDestinationModel.type'
  import popularCompStore from '../../stores/popularCompStore'
  import Lazy from 'svelte-lazy'
  export let popularDestination: PopularDestination

  function showModal() {
    console.log('clicked ')
    console.log(popularDestination.Dest[0].DestinationId)
    getRoutines()
  }

  const getRoutines = async () => {
    const data = await queryGraphql(
      'http://localhost:8881/v1',
      `query getDestinationById ($destinationId: String = "") {
          getDestinationById (destinationId: $destinationId) {
            destinationId
            name
            intro
            summary
          }
        }`,
      { destinationId: popularDestination.Dest[0].DestinationId },
    )

    console.log(data.getDestinationById)
    let popularDestinationData: PopularDestinationGraphql =
      data.getDestinationById
    let showPopularToggle = $popularCompStore.showPopular
    showPopularToggle = !showPopularToggle
    popularCompStore.set({
      showPopular: showPopularToggle,
      img: popularDestination.Dest[0].Picture,
      name: popularDestinationData.name,
      intro: popularDestinationData.intro,
      summary: popularDestinationData.summary,
    })
  }
</script>

<button
  class="flex flex-col bg-white shadow-md transform motion-safe:hover:scale-105 hover:shadow-lg"
  on:click={showModal}
>
  <Lazy height={300}>
    <!-- svelte-ignore a11y-img-redundant-alt -->
    {#if popularDestination.Dest[0].Picture}
      <img
        class=" object-cover"
        src={popularDestination.Dest[0].Picture}
        alt="Picture of {popularDestination.Dest[0].Name}"
      />
    {:else}
      <!-- If there is no image show placeholder -->
      <div class="bg-gray-300">
        <img
          class=" object-fill opacity-0"
          src="https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1740&q=80"
          alt=""
        />
      </div>
    {/if}
  </Lazy>
  <span class="h-2 w-3/4 bg-forest-green block" />
  <div class="w-full flex justify-between items-center p-2 bg-white">
    <div>
      <h1 class="font-bold text-lg text-dim-gray mb-1 whitespace-nowrap">
        {popularDestination.Dest[0].Name}, {popularDestination.Name}
      </h1>
      <div class="flex">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 mr-2"
          viewBox="0 0 28.48 35.065"
        >
          <path
            id="Subtraction_1"
            data-name="Subtraction 1"
            d="M708.24-1370.935h0a70.014,70.014,0,0,1-10.657-11.613c-2.377-3.465-3.582-6.564-3.582-9.211a14.147,14.147,0,0,1,4.171-10.069A14.147,14.147,0,0,1,708.24-1406a14.147,14.147,0,0,1,10.069,4.171,14.147,14.147,0,0,1,4.171,10.069c0,2.669-1.205,5.79-3.582,9.278a65.6,65.6,0,0,1-10.657,11.547ZM708-1397a5.006,5.006,0,0,0-5,5,5.006,5.006,0,0,0,5,5,5.006,5.006,0,0,0,5-5A5.005,5.005,0,0,0,708-1397Z"
            transform="translate(-694 1406)"
            fill="#fc5757"
          />
        </svg>
        <p>520 km</p>
      </div>
    </div>
  </div>
</button>
