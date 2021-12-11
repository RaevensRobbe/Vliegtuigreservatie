<script lang="ts">
    import Intertitle from '../../components/Intertitle.svelte'
    import SearchFlightNumberComponent from '../../components/adminComponents/SearchFlightNumberComponent.svelte'
    import type Flight from '../../models/FlightModel.type'
    import { onMount } from 'svelte'
    import { get } from '../../utils/useApi'
    import BookingFlight from '../../components/bookingOverviewComponents/bookingFlight.svelte'
    import Spinner from '../../components/animations/spinner.svelte'
    import { goto } from '$app/navigation'
    import authStore from '../../stores/authStore'
    import FlightList from '../../components/reviews/flightList.svelte'
  
        let flights: Array<Flight> = []
        let flightsLoaded: boolean = false
    // let specificFlightData: Flight
    // let flightNumber: string = null
  
    // function handleSubmit() {
    //   getSpecific()
    // }
    // async function getSpecific() {
    //   specificFlightData = await get(
    //     `http://localhost:3001/api/v1/flight/reviews/${flightNumber}`,
    //   )
    // }
  
    onMount(async () => {
      $authStore.user.getIdToken(true)
      .then((token) => {
        console.log(token)
        get('http://localhost:3001/api/v1/flight/all', token)
        .then((data) => {
          flights = data
          flightsLoaded = true
        })
      })
    })
  
    function addFlight() {
      goto('/admin/createFlight')
    }
    function addAdmin() {
      goto('/admin/createAdmin')
    }
    function goToReviews() {
      goto('/admin/overviewReviews')
    }
</script>

<body>
    {#each flights as flight }
        <FlightList flightData = {flight}/>
    {/each}
</body>



  