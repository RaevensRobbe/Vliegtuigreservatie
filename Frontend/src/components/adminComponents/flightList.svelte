<script lang="ts">
  import { goto } from '$app/navigation'

  import { reviewStore } from '../../stores/flightStore'
  import { editStore } from '../../stores/editStore'
  import { getTouchdownTime } from './../../utils/calculateDistance'

  export let flightData: any
  export let review: boolean
  console.log(flightData)

  let date: Date = new Date(flightData.Date)
  let departureTime: string = getDepartureTime()
  let occupationRate: number
  let occupation: string
  let color: string

  function getDepartureTime() {
    let tempDate = new Date(flightData.Date)
    // return tempDate.getHours() + ':' + tempDate.getMinutes()
    let hours = ('0' + tempDate.getHours()).slice(-2)
    let minutes = ('0' + tempDate.getMinutes()).slice(-2)
    return hours + ':' + minutes
  }

  function getDay() {
    let day = date.toLocaleString('default', { day: '2-digit' })
    let month = date.toLocaleString('default', { month: 'long' })
    return day
  }

  function getMonth() {
    let month = date.toLocaleString('default', { month: 'long' })
    return month
  }

  function navigate() {
    if (review) {
      $reviewStore.flightId = flightData.FlightId
      goto('/admin/flightReviews')
    } else {
      $editStore = [flightData]
      goto('/admin/editFlight')
    }
  }

  function allSeats() {
    let totalSeats: number
    if (flightData) {
      totalSeats =
        flightData.Plane.EconomySeats + flightData.Plane.BusinessSeats
    } else {
      totalSeats = 0
    }
    console.log(totalSeats)
    return totalSeats
  }

  function allPassengers() {
    let totalPersons: number = 0

    for (let ticket of flightData.Ticket) {
      console.log(ticket)
      for (let persons of ticket.Persons) {
        totalPersons = totalPersons + 1
      }
    }

    console.log(totalPersons)
    return totalPersons
  }

  function calcOccupationRate() {
    const seats = allSeats()
    const passengers = allPassengers()

    occupationRate = Math.round((passengers / seats) * 100)
    occupation = `${passengers} / ${seats}`

    if (occupationRate > 0 && occupationRate < 50) {
      color = 'text-dim-gray'
    } else if (occupationRate >= 50 && occupationRate < 75) {
      color = 'text-orange'
    } else color = 'text-tomato-red'
  }

  calcOccupationRate()
</script>

<div
  class="my-6 md:my-4 grid grid-rows-5 md:grid-rows-none md:grid-cols-7 bg-white shadow-md text-center transform duration-300 motion-safe:hover:scale-105 hover:shadow-lg md:mx-6 cursor-pointer"
  on:click={navigate}
>
  <div class="flex md:flex-col justify-center my-auto md:p-4">
    <p class="font-bold text-lg lg:text-2xl text-forest-green mr-1 md:mr-0">
      {getDay()}
    </p>
    <p class="font-bold text-lg lg:text-2xl text-forest-green">
      {getMonth()}
    </p>
  </div>

  <div
    class="row-span-3 py-4 md:py-0 md:col-span-5 grid grid-rows-3 md:grid-rows-none md:grid-cols-4 border-t-1 border-b-1 md:border-b-0 md:border-t-0 md:border-l-1 md:border-r-1 my-auto gap-2 md:gap-0"
  >
    <div class="my-auto">
      <p class="font-bold text-lg text-forest-green">
        {getDepartureTime()}
      </p>
      <p class="text-lg">{flightData.Start.Name}</p>
    </div>
    <div class="flex justify-center flex-col">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="fill-current dim-gray h-3 md:h-4"
        viewBox="0 0 44 22.458"
      >
        <g
          id="Flight_icon"
          data-name="Flight icon"
          transform="translate(-829 -1009.771)"
        >
          <path
            id="bxs-plane-take-off"
            d="M46.813,14.674a3.616,3.616,0,0,0-4.572-2.288L32.195,15.737,14.229,9,9.737,11.246l13.475,8.983L14.229,24.72,5.246,20.229,3,22.475l8.983,8.983,32.67-12.251a3.619,3.619,0,0,0,2.16-4.532Z"
            transform="translate(826 1000.771)"
          />
        </g>
      </svg>
      <p class="font-bold text-lg lg:text-2xl text-forest-green mr-1 md:mr-0">
        {flightData.Name}
      </p>
    </div>
    <div class="my-auto">
      <p class="font-bold text-lg text-forest-green">
        {getTouchdownTime(
          flightData.Start.Coordinates,
          flightData.Destination.Coordinates,
          departureTime,
        )}
      </p>
      <p class="text-lg">{flightData.Destination.Name}</p>
    </div>
    <div class="my-auto">
      <p class="text-lg {color}">{occupation} taken</p>
    </div>
  </div>

  {#if review}
    <p class=" flex font-bold text-lg lg:text-2xl justify-center my-auto">
      See reviews
    </p>
  {:else}
    <p class=" flex font-bold text-lg lg:text-2xl justify-center my-auto">
      Edit flight
    </p>
  {/if}
</div>
