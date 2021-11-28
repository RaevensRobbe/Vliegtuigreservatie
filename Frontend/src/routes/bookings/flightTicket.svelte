<script lang="ts">
  import Ticket from './../../components/ticketComponents/ticket.svelte'
  import { travelerStore } from '../../stores/travelerStore'
  import { bookingTicket } from '../../stores/flightStore'
  import Intertitle from './../../components/Intertitle.svelte'
  import { onMount } from 'svelte'
  import { get } from '../../utils/useApi'
  import Spinner from '../../components/animations/spinner.svelte'
  import Review from '../../components/bookingOverviewComponents/review.svelte'

  let ticketData: any
  let travelerData: any = []
  let flightData: any
  let loaded: boolean = false

  onMount(async () => {
    console.log(
      `http://localhost:3001/api/v1/ticket/${$bookingTicket.ticketId}`,
    )
    ticketData = await get(
      `http://localhost:3001/api/v1/ticket/${$bookingTicket.ticketId}`,
    )

    console.log(ticketData)
    ticketData.Persons.forEach((person, index) => {
      var nameParts = person.split(' ')
      travelerData.push({
        firstName: nameParts[0],
        lastName: nameParts[nameParts.length - 1],
        seatNrDep: ticketData.Seat[index].column + ticketData.Seat[index].row,
        classDep: ticketData.Seat[index].class,
      })
    })
    flightData = ticketData.Flight
    console.log(travelerData)
    loaded = true
  })
</script>

<section class="m-4 px-6 ">
  <Intertitle titleName="Tickets" />
  {#if loaded}
    {#each travelerData as traveler}
      <Ticket travelerData={traveler} {flightData} retour={false} />
    {/each}
  {:else}
    <div class="w-full h-full flex justify-center my-auto col-span-full">
      <Spinner />
    </div>
  {/if}
</section>

<section class="m-4 px-6">
  <Intertitle titleName="Review" />
  <Review />
</section>
