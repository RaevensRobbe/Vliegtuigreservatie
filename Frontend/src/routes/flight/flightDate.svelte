<script>
  import SelectFlightDate from './../../components/flightDateComponents/SelectFlightDate.svelte'
  import FlightSearch from './../../components/FlightSearch.svelte'
  import Intertitle from './../../components/Intertitle.svelte'
  import { FlightStore } from './../../stores/flightStore'

  let flight = $FlightStore
</script>

<svelte:head>
  <title>MCT Airlines - Flight Date</title>
</svelte:head>

<section class="bg-image-mainpage bg-cover w-full h-auto bg-bottom py-16">
  <FlightSearch />
</section>

<section class="p-4 px-6 align-start">
  <Intertitle
    titleName={flight.departureLocation + ' - ' + flight.destinationLocation}
  />
  <h1 class="text-xl mb-6">Choose your departure flight</h1>
  <SelectFlightDate/>
</section>