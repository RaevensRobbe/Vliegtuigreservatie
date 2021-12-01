<script lang="ts">
  import Intertitle from '../../components/Intertitle.svelte'
  import SearchFlightNumberComponent from '../../components/adminComponents/SearchFlightNumberComponent.svelte'
  import { onMount } from 'svelte'
  import { get } from '../../utils/useApi'
  let flightNumber: string = null

  let flights: any = []
  let flightsLoaded: boolean = false
  onMount(async () => {
    flights = await get('http://localhost:3001/api/v1/flight/all')
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
    <div>
      <p>flights komen hier</p>
    </div>
  </section>
</body>
