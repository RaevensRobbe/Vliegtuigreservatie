<script lang="ts">
  //@ts-nocheck
  import { get } from '../../utils/useApi'

  import { onMount } from 'svelte'
  import Spinner from './../../components/animations/spinner.svelte'
  import authStore from '../../stores/authStore'
  import Intertitle from '../../components/Intertitle.svelte'
  import BookingFlight from './../../components/bookingOverviewComponents/bookingFlight.svelte'
  import NoBooking from './../../components/bookingOverviewComponents/noBooking.svelte'
  import { BookingStore } from './../../stores/overviewBookingStore'

  import { _ } from '../../utils/i18n'
  import { init } from 'svelte-i18n'
  import languageStore from '../../stores/languageStore'

  init({
    fallbackLocale: 'en',
    initialLocale: $languageStore.language,
  })

  let loaded = false
  let bookings: any = []

  let futureBookings: any = []
  let previousBookings: any = []

  let previousDate = new Date().getFullYear() + 1

  onMount(async () => {
    bookings = await get(
      `http://localhost:3001/api/v1/flight/userFlights/${$authStore.user.uid}`, // tT6Rcds5rlMFLpRcaSGOtH0ttYW2 => user with most data
    )
    if (bookings.error) {
    } else {
      bookings.forEach(booking => {
        let bookingDate = new Date(booking.Date)
        if (bookingDate > Date.now()) {
          futureBookings.push(booking)
        } else {
          previousBookings.push(booking)
        }
      })
      $BookingStore.previousYear = new Date().getFullYear() + 1
    }
    loaded = true
  })
</script>

{#if loaded}
  <section class="m-4 px-6">
    <Intertitle titleName={$_('bookings.title1')} />
    {#if futureBookings.length > 0}
      {#each futureBookings as booking}
        <BookingFlight flightData={booking} booking={true} />
      {/each}
    {:else}
      <NoBooking booking={'future'} />
    {/if}
  </section>

  <section class="m-4 px-6">
    <Intertitle titleName={$_('bookings.title2')} />
    {#if previousBookings.length > 0}
      {#each previousBookings as booking}
        {#if new Date(booking.Date).getFullYear() >= $BookingStore.previousYear}
          <BookingFlight flightData={booking} booking={true} />
        {:else}
          <!-- {calculateYear(booking.Date)} -->
          <p class="text-lg">
            {($BookingStore.previousYear = new Date(
              booking.Date,
            ).getFullYear())}
          </p>
          <BookingFlight flightData={booking} booking={true} />
        {/if}
      {/each}
    {:else}
      <NoBooking booking={'previous'} />
    {/if}
  </section>
{:else}
  <Spinner />
{/if}
