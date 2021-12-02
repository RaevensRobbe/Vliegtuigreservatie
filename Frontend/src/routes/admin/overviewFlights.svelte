<script lang="ts">
  import Intertitle from '../../components/Intertitle.svelte'
  import SearchFlightNumberComponent from '../../components/adminComponents/SearchFlightNumberComponent.svelte'
  import { onMount } from 'svelte'
  import { get } from '../../utils/useApi'
  import BookingFlight from '../../components/bookingOverviewComponents/bookingFlight.svelte'
  let flightNumber: string = null

  let flights: any = []
  let flightsLoaded: boolean = false
  onMount(async () => {
    flights = await get('http://localhost:3001/api/v1/flight/allupcoming')
    console.log(flights)
    flightsLoaded = true
  })
</script>

<body>
  <section class="bg-image-mainpage bg-cover w-full h-auto bg-bottom py-36">
    <SearchFlightNumberComponent {flightNumber} />
  </section>
  <section class="m-4 px-6">
    <button
      class="flex p-4 justify-center items-center font-bold text-xl text-white bg-forest-green rounded-xl hover:bg-cyprus-green"
    >
      Add a flight
    </button>
  </section>
  <section class="m-4 px-6">
    <Intertitle titleName="All upcoming flights" />
    <div class="max-h-1/2 overflow-x-hidden overflow-y-scroll custom-scroll">
      {#each flights as flight}
        <BookingFlight flightData={flight} booking={false} />
      {/each}
    </div>
  </section>
</body>

<style>
  .custom-scroll::-webkit-scrollbar {
    width: 0.5rem;
    cursor: pointer;
  }
  .custom-scroll::-webkit-scrollbar-track {
    background-color: rgb(104, 104, 104, 0.2);
    cursor: pointer;
  }
  .custom-scroll::-webkit-scrollbar-thumb {
    cursor: pointer;
    background-color: #686868;
    border: 2px solid #686868;
    border-radius: 50px;
  }
</style>
