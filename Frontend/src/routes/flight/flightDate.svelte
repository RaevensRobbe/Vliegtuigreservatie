<script>
  import AppHeader from './../../components/AppHeader.svelte'
  import AppFooter from './../../components/AppFooter.svelte'
  import FlightSearch from './../../components/FlightSearch.svelte'
  import Intertitle from './../../components/Intertitle.svelte'
  import { FlightStore } from './../../stores/flightStore'

  let flight = $FlightStore
</script>

<svelte:head>
  <title>MCT Airlines - Flight Date</title>
</svelte:head>

<AppHeader />

<section class="bg-image-mainpage bg-cover w-full h-auto bg-bottom py-16">
  <FlightSearch />
</section>

<section class="p-4 px-6 align-start">
  <Intertitle
    titleName={flight.departureLocation + ' - ' + flight.destinationLocation}
  />
</section>

<AppFooter />
