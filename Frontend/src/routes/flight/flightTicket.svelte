<script lang="ts">
  import Ticket from './../../components/ticketComponents/ticket.svelte'
  import { travelerStore } from '../../stores/travelerStore'
  import { FlightStore } from '../../stores/FlightStore'
  import Intertitle from './../../components/Intertitle.svelte'
  import { onMount } from 'svelte'
  import { get } from '../../utils/useApi'
  import Spinner from '../../components/animations/spinner.svelte'

  let travelers: any = $travelerStore
  let departureFlightData: any
  let retourFlightData: any
  let loaded: boolean = false
  console.log($FlightStore)

  onMount(async () => {
    departureFlightData = await get(
      `http://localhost:3001/api/v1/flight/${$FlightStore.departureFlight}`,
    )
    if ($FlightStore.retourFlight) {
      retourFlightData = await get(
        `http://localhost:3001/api/v1/flight/${$FlightStore.retourFlight}`,
      )
    }
    loaded = true
  })
</script>

<section class="m-4 px-6 ">
  <Intertitle titleName="Tickets" />
  {#if loaded}
    {#each travelers as traveler}
      <Ticket
        travelerData={traveler}
        flightData={departureFlightData}
        retour={false}
      />
    {/each}
    {#if $FlightStore.retourFlight}
      {#each travelers as traveler}
        <Ticket
          travelerData={traveler}
          flightData={retourFlightData}
          retour={true}
        />
      {/each}
    {/if}
  {:else}
    <div class="w-full h-full flex justify-center my-auto col-span-full">
      <Spinner />
    </div>
  {/if}
</section>
