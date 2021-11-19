<script lang="ts">
  //@ts-nocheck
  import { get } from './../../composables/useApi'

  import { onMount } from 'svelte'
  import Spinner from './../../components/animations/spinner.svelte'
  import Intertitle from './../../components/Intertitle.svelte'
  import BookingFlight from './../../components/bookingOverviewComponents/bookingFlight.svelte'
  import { BookingStore } from './../../stores/overviewBookingStore'

  let loaded = false

  let bookings: any = []

  let futureBookings: any = []
  let previousBookings: any = []

  let previousDate = new Date().getFullYear() + 1

  function calculateYear(bookingDate: Date) {
    previousDate = new Date(bookingDate).getFullYear()
    console.log(previousDate)
  }

  onMount(async () => {
    bookings = await get(
      'http://localhost:3001/api/v1/flight/userFlights/tT6Rcds5rlMFLpRcaSGOtH0ttYW2',
    )

    bookings.forEach(booking => {
      let bookingDate = new Date(booking.Date)
      if (bookingDate > Date.now()) {
        futureBookings.push(booking)
      } else {
        previousBookings.push(booking)
      }
    })
    $BookingStore.previousYear = new Date().getFullYear() + 1
    loaded = true
  })
</script>

{#if loaded}
  {#if futureBookings}
    <section class="m-4 px-6">
      <Intertitle titleName="Future bookings" />
      {#each futureBookings as booking}
        <BookingFlight bookingData={booking} />
      {/each}
    </section>
  {/if}

  {#if previousBookings}
    <section class="m-4 px-6">
      <Intertitle titleName="Previous bookings" />
      {#each previousBookings as booking}
        {#if new Date(booking.Date).getFullYear() >= $BookingStore.previousYear}
          <BookingFlight bookingData={booking} />
        {:else}
          <!-- {calculateYear(booking.Date)} -->
          <p class="text-lg">
            {($BookingStore.previousYear = new Date(
              booking.Date,
            ).getFullYear())}
          </p>
          <BookingFlight bookingData={booking} />
        {/if}
      {/each}
    </section>
  {/if}
{:else}
  <Spinner />
{/if}
