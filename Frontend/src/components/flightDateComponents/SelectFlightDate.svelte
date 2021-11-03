<script lang="ts">
  //@ts-nocheck
  import { get } from './../../composables/useApi'
  import { FlightStore } from './../../stores/flightStore'
  import { onMount } from 'svelte'

  let givenflights
  let storageDate = '2021-11-05'
  let chosenflight
  let position
  let flights = new Array()
  let loaded = false
  let flightTime
  let departureTime
  export let url

  onMount(async () => {
    givenflights = await get(url)
    let i = 0
    let exactdate = false
    let closestAmountOfDays = 360

    givenflights.sort(function (a: Date, b: Date) {
      var c = new Date(a.Date)
      var d = new Date(b.Date)
      return c - d
    })

    givenflights.forEach(flight => {
      let dateTime = flight.Date.split('T')[0]
      if (dateTime == storageDate) {
        position = i
        exactdate = true
        console.log('true')
      } else if (exactdate == false) {
        // To set two dates to two variables
        let date1 = new Date(dateTime)
        let date2 = new Date(storageDate)
        // To calculate the time difference of two dates
        let Difference_In_Time = date2.getTime() - date1.getTime()
        // To calculate the number of days between two dates
        let Difference_In_Days = Math.abs(
          Difference_In_Time / (1000 * 3600 * 24),
        )
        if (Difference_In_Days < closestAmountOfDays) {
          closestAmountOfDays = Difference_In_Days
          position = i
        }
      }
      i++
    })

    console.log(givenflights)

    for (let j = -3; j < 4; j++) {
      if (j === 0) {
        console.log(position)
        let flightInfo = await get(
          `http://localhost:3001/api/v1/flight/${givenflights[position].FlightId}`,
        )
        chosenflight = flightInfo
        flights.push(flightInfo)
      } else {
        if (givenflights[position + j]?.FlightId !== undefined) {
          let flightInfo = await get(
            `http://localhost:3001/api/v1/flight/${
              givenflights[position + j].FlightId
            }`,
          )
          flights.push(flightInfo)
        } else {
          flights.push({
            flightId: null,
          })
        }
      }
      i++
    }

    console.log(flights)

    loaded = true
  })

  function calculateDayName(date: Date) {
    var days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ]
    var d = new Date(date)
    return days[d.getDay()]
  }

  function calculatePrice(price: number) {
    let childrenPrice = price * 0.75 * $FlightStore.children
    let adultPrice = price * $FlightStore.adults
    let totalprice = Math.round((childrenPrice + adultPrice) * 100) / 100
    return totalprice
  }

  function setChosenFlight(flightId: number) {
    flights.forEach(flight => {
      if (flight.FlightId == flightId) {
        chosenflight = flight
      }
    })
  }

  function getDepartureTime(date: Date) {
    let datePartTwo = date.split('T')[1]
    let dateHour = datePartTwo.split(':')[0]
    let dateMinute = datePartTwo.split(':')[1]
    departureTime = dateHour + ':' + dateMinute
    return dateHour + ':' + dateMinute
  }

  function getTouchdownTime() {
    let flightPartOne = flightTime.split(':')[0]
    let flightPartTwo = flightTime.split(':')[1]

    let departureTimePartOne = departureTime.split(':')[0]
    let departureTimePartTwo = departureTime.split(':')[1]

    let touchdownTimePartOne =
      parseInt(Number(flightPartOne)) + parseInt(Number(departureTimePartOne))

    let touchdownTimePartTwo =
      parseInt(Number(flightPartTwo)) + parseInt(Number(departureTimePartTwo))

    if (touchdownTimePartOne == 24) {
      touchdownTimePartOne = 0
    } else if (touchdownTimePartOne > 24) {
      touchdownTimePartOne = touchdownTimePartOne - 24
    }
    if (touchdownTimePartOne < 10) {
      touchdownTimePartOne = '0' + touchdownTimePartOne
    }
    if (touchdownTimePartTwo == 60) {
      touchdownTimePartTwo = 0
    } else if (touchdownTimePartTwo > 60) {
      touchdownTimePartTwo = touchdownTimePartTwo - 60
    }
    if (touchdownTimePartTwo < 10) {
      touchdownTimePartTwo = '0' + touchdownTimePartTwo
    }

    // return 'test'
    return touchdownTimePartOne + ':' + touchdownTimePartTwo
  }

  function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    let radius = 6371 // Radius of the earth in km
    let dLat = deg2rad(lat2 - lat1) // deg2rad below
    let dLon = deg2rad(lon2 - lon1)
    let a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2)
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    let d = radius * c // Distance in km
    return d
  }

  function deg2rad(deg) {
    return deg * (Math.PI / 180)
  }

  function calculateFlightTime() {
    let distance = getDistanceFromLatLonInKm(
      chosenflight.Start.Coordinates[0],
      chosenflight.Start.Coordinates[1],
      chosenflight.Destination.Coordinates[0],
      chosenflight.Start.Coordinates[1],
    )
    //format to hours and minutes
    let time = distance / 850
    let hours = parseInt(Number(time))
    let minutes = Math.round((Number(time) - hours) * 60)
    flightTime = hours + ':' + minutes
    let returnSentence
    if (hours == 1) {
      if (minutes == 1) {
        returnSentence = hours + ' hour ' + minutes + ' minute'
      } else {
        returnSentence = hours + ' hour ' + minutes + ' minutes'
      }
    } else if (minutes == 1) {
      returnSentence = hours + ' hours ' + minutes + ' minute'
    } else {
      returnSentence = hours + ' hours ' + minutes + ' minutes'
    }
    return returnSentence
  }
</script>

<section class="grid grid-cols-7 grid- border-r-0 items-end">
  {#if loaded}
    {#each flights as flight}
      {#if flight.FlightId != null}
        <label key={flight.FlightId}>
          <input
            type="radio"
            name="city"
            id={flight.FlightId}
            value={flight.Date.split('T')[0]}
            class="peer hidden"
            bind:group={storageDate}
            on:click={() => setChosenFlight(flight.FlightId)}
          />
          <div
            class="bg-white border-forest-green peer-checked:border-t-8 align-bottom"
          >
            <div
              class="bg-white border-r-1 border-l-1 flex flex-col justify-items-end  text-center shadow-md justify-end hover:bg-gray-200"
            >
              <p class="text-forest-green font-bold m-2 text-xl">
                {calculateDayName(flight.Date.split('T')[0])}
              </p>
              <p class="">{flight.Date.split('T')[0]}</p>
              <p class="text-cyprus-green font-bold m-2 text-xl">
                €{calculatePrice(flight.Price)}
              </p>
            </div>
          </div>
        </label>
      {:else}
        <div
          class="bg-white border-forest-green peer-checked:border-t-8 align-bottom flex flex-col h-full"
        >
          <div
            class="bg-white border-r-1 border-l-1 flex flex-col text-center shadow-md justify-end hover:bg-gray-200  h-full justify-center"
          >
            <p class="text-forest-green font-bold m-2 text-xl" />
            <p class="">No flight</p>
            <p class="text-cyprus-green font-bold m-2 text-xl" />
          </div>
        </div>
      {/if}
    {/each}
  {:else}
    <p>loading</p>
  {/if}
</section>

{#if chosenflight}
  <section class="mt-6 grid grid-cols-3 bg-white shadow-md text-center p-4">
    <div>
      <p class="font-bold text-2xl text-forest-green">
        {getDepartureTime(chosenflight.Date)}
      </p>
      <p>{chosenflight.Start.Name}</p>
    </div>
    <div class="flex justify-center flex-col">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="fill-current text-forest-green h-4"
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
      <p>Duration {calculateFlightTime()}</p>
    </div>
    <div>
      <p class="font-bold text-2xl text-forest-green">{getTouchdownTime()}</p>
      <p>{chosenflight.Destination.Name}</p>
    </div>
  </section>
{/if}
