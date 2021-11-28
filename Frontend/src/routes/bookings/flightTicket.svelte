<script lang="ts">
  import Ticket from './../../components/ticketComponents/ticket.svelte'
  import { travelerStore } from '../../stores/travelerStore'
  import { bookingTicket } from '../../stores/flightStore'
  import Intertitle from './../../components/Intertitle.svelte'
  import { onMount } from 'svelte'
  import { get } from '../../utils/useApi'
  import Spinner from '../../components/animations/spinner.svelte'
  import Review from '../../components/bookingOverviewComponents/review.svelte'
  import { goto } from '$app/navigation'

  let ticketData: any
  let travelerData: any = []
  let flightData: any
  let loaded: boolean = false
  onMount(async () => {
    ticketData = await get(
      `http://localhost:3001/api/v1/ticket/${$bookingTicket.ticketId}`,
    )

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
    // console.log(ticketData.Review)
    loaded = true
  })

  function goBack() {
    goto('/bookings/bookingOverview')
  }
</script>

<section
  class="p-4 flex hover:cursor-pointer hover:font-bold"
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
{#if loaded}
  <section class="m-4 px-6">
    {#if ticketData.Review}
      <Intertitle titleName="Your review" />
    {:else}
      <Intertitle titleName="Give a review" />
    {/if}
    <Review
      flight={$bookingTicket.ticketId}
      givenRating={ticketData.Rating}
      givenReview={ticketData.Review}
    />
  </section>
{/if}
