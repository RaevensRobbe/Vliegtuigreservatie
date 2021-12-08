<script lang="ts">
  //@ts-nocheck
  import { get } from '../../utils/useApi'
  import { FlightStore } from './../../stores/FlightStore'
  import { onMount } from 'svelte'
  import {
    calculateFlightTimeLong,
    getTouchdownTime,
  } from './../../utils/calculateDistance'

  let givenflights: Array<Flight>
  let controldate: Date
  let chosenflight: string
  let position: number
  let flights: Array<Flight> = new Array()
  let loaded: boolean = false
  let noData: boolean = false
  let departureTime: string

  export let url: string
  export let retour: boolean

  let radiobuttonName: string
  if (retour === true) {
    radiobuttonName = 'retour'
  } else {
    radiobuttonName = 'departure'
  }

  let firstDate: Date = new Date()
  let lastDate: Date = new Date()

  if (retour === true) {
    controldate = $FlightStore.retourDate
  } else {
    controldate = $FlightStore.departureDate
  }

  let datum: Date = new Date(controldate)

  firstDate.setDate(datum.getDate() - 3)
  lastDate.setDate(datum.getDate() + 3)

  onMount(async () => {
    givenflights = await get(url)

    let i: number = 0
    let exactdate: boolean = false
    let closestAmountOfDays: number = 360

    // check if there are flights
    if (givenflights.length > 0) {
      noData = false

      givenflights.forEach(flight => {
        let dateTime: string = flight.Date.split('T')[0]

        if (dateTime == controldate) {
          position = i
          exactdate = true
        } else if (exactdate == false) {
          // To set two dates to two variables
          let date1: Date = new Date(dateTime)
          let date2: Date = new Date(controldate)

          // To calculate the time difference of two dates
          let Difference_In_Time: number = date2.getTime() - date1.getTime()

          // To calculate the number of days between two dates
          let Difference_In_Days: number = Math.abs(
            Difference_In_Time / (1000 * 3600 * 24),
          )

          if (Difference_In_Days < closestAmountOfDays) {
            closestAmountOfDays = Difference_In_Days
            position = i
          }
        }
      })

      if (position === undefined && givenflights.length > 0) {
      }

      if (position !== undefined) {
        for (let j = -3; j < 4; j++) {
          // if j == 0 => middlepoint selected date / closest to selected date
          if (j === 0) {
            let flightInfo: Flight = await get(
              `http://localhost:3001/api/v1/flight/${givenflights[position].FlightId}`,
            )
            flights.push(flightInfo)
            setChosenFlight(flightInfo.FlightId)
          } else {
            if (givenflights[position + j]?.FlightId !== undefined) {
              let flightInfo: Flight = await get(
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
        loaded = true
      } else {
        noData = true
      }
    } else {
      noData = true
    }
  })

  function calculateDayName(date: Date) {
    let d: Date = new Date(date)
    return d.toLocaleString('default', { weekday: 'long' })
  }

  function dateFormat(date: Date) {
    let datum: Date = new Date(date)
    return datum.toLocaleString('default', { day: '2-digit', month: 'long' })
  }

  function calculatePrice(price: number) {
    // children pay 0.75 of the full price
    let childrenPrice: number = price * 0.75 * $FlightStore.children
    let adultPrice: number = price * $FlightStore.adults
    // calculate total price
    let totalprice: number =
      Math.round((childrenPrice + adultPrice) * 100) / 100
    return totalprice
  }

  function setChosenFlight(flightId: number) {
    //set chosenflight to flight to show the time of flight
    flights.forEach(flight => {
      if (flight.FlightId == flightId) {
        chosenflight = flight
        // set flightId in store
        if (retour === false) {
          $FlightStore.departureFlight = chosenflight.FlightId
          $FlightStore.departurePrice = chosenflight.Price
          $FlightStore.departureCoordinates = chosenflight.Start.Coordinates
          $FlightStore.departureDate = chosenflight.Date
          $FlightStore.departureAbbreviation = chosenflight.Start.Abbreviation
        } else {
          $FlightStore.retourFlight = chosenflight.FlightId
          $FlightStore.retourPrice = chosenflight.Price
          $FlightStore.destinationCoordinates = chosenflight.Start.Coordinates
          $FlightStore.retourDate = chosenflight.Date
          $FlightStore.destinationAbbreviation = chosenflight.Start.Abbreviation
        }
      }
    })
  }

  function getDepartureTime(date: Date) {
    let datePartTwo: string = date.split('T')[1]
    let dateHour: string = datePartTwo.split(':')[0]
    let dateMinute: string = datePartTwo.split(':')[1]
    departureTime = dateHour + ':' + dateMinute
    return dateHour + ':' + dateMinute
  }
</script>

<section
  class="grid grid-cols-3 md:mx-6  md:grid-cols-4 lg:grid-cols-7 border-r-0 items-end gap-y-4"
>
  {#if loaded}
    {#each flights as flight}
      {#if flight.FlightId != null}
        <label key={flight.FlightId} class="lg:mb-0">
          <input
            type="radio"
            name={radiobuttonName}
            id={flight.FlightId}
            value={flight.Date.split('T')[0]}
            class="peer hidden"
            bind:group={controldate}
            on:click={() => setChosenFlight(flight.FlightId)}
          />
          <div
            class="bg-white border-forest-green peer-checked:border-t-8 align-bottom cursor-pointer"
          >
            <div
              class="bg-white border-r-1 border-l-1 flex flex-col justify-items-end  text-center shadow-md justify-end hover:bg-gray-200"
            >
              <p class="text-forest-green font-bold m-2 text-sm md:text-xl">
                {calculateDayName(flight.Date.split('T')[0])}
              </p>
              <p class="text-sm md:text-md">
                {dateFormat(flight.Date)}
              </p>
              <p class="text-cyprus-green font-bold m-2 text-sm md:text-xl">
                €{calculatePrice(flight.Price)}
              </p>
            </div>
          </div>
        </label>
      {:else}
        <div class="bg-white border-forest-green align-bottom flex flex-col">
          <div
            class="bg-white border-r-1 border-l-1 flex flex-col text-center shadow-md justify-center"
          >
            <p class="text-white font-bold m-2 text-sm md:text-xl">.</p>
            <p class="text-sm md:text-md">No flight</p>
            <p class="text-white font-bold m-2 text-sm md:text-xl">.</p>
          </div>
        </div>
      {/if}
    {/each}
  {:else if noData}
    <div
      class="flex flex-col p-8 justify-center text-center font-bold text-forest-green  bg-white shadow-md col-span-3 md:col-span-4 lg:col-span-7"
    >
      <p>No flights found between</p>
      <p class="font-normal text-dim-gray">
        {firstDate.toISOString().split('T')[0]} and {lastDate
          .toISOString()
          .split('T')[0]}
      </p>
    </div>
  {:else}
    <p>loading</p>
  {/if}
</section>

{#if chosenflight}
  <section
    class="mt-6 md:mx-6 grid grid-cols-3 bg-white shadow-md text-center p-4"
  >
    <div>
      <p class="font-bold text-md md:text-2xl text-forest-green">
        {getDepartureTime(chosenflight.Date)}
      </p>
      <p class="text-sm md:text-md">{chosenflight.Start.Name}</p>
    </div>
    <div class="flex justify-center flex-col">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="fill-current text-forest-green h-3 md:h-4"
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
      <p class="text-sm md" text-md>
        Duration {calculateFlightTimeLong(
          chosenflight.Start.Coordinates,
          chosenflight.Destination.Coordinates,
        )}
      </p>
    </div>
    <div>
      <p class="font-bold text-md md:text-2xl text-forest-green">
        {getTouchdownTime(
          chosenflight.Start.Coordinates,
          chosenflight.Destination.Coordinates,
          departureTime,
        )}
      </p>
      <p class="text-sm md:text-md">{chosenflight.Destination.Name}</p>
    </div>
  </section>
{/if}
