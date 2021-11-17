<script lang="ts">
  //@ts-nocheck
  import { get } from './../../composables/useApi'

  import { onMount } from 'svelte'
  import Spinner from './../../components/animations/spinner.svelte'
  import Intertitle from './../../components/Intertitle.svelte'
  import BookingFlight from './../../components/bookingOverviewComponents/bookingFlight.svelte'

  let loaded = false

  let bookings: any = []

  let futureBookings: any = []
  let previousBookings: any = []

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
    loaded = true
  })
</script>

{#if loaded}
  {#if futureBookings}
    <section class="m-4">
      <Intertitle titleName="Future bookings" />
      {#each futureBookings as booking}
        <BookingFlight bookingData={booking} />
      {/each}
    </section>
  {/if}

  {#if previousBookings}
    <section class="m-4">
      <Intertitle titleName="Previous bookings" />
      {#each previousBookings as booking}
        <BookingFlight bookingData={booking} />
      {/each}
    </section>
  {/if}
{:else}
  <Spinner />
{/if}
