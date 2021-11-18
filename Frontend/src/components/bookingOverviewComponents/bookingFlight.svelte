<script lang="ts">
  import {
    calculateFlightTimeLong,
    getTouchdownTime,
  } from './../../utils/calculateDistance'

  export let bookingData: any

  let date = new Date(bookingData.Date)
  let departureTime = getDepartureTime()

  function getDepartureTime() {
    let datePartTwo = bookingData.Date.split('T')[1]
    let dateHour = datePartTwo.split(':')[0]
    let dateMinute = datePartTwo.split(':')[1]
    console.log(
      date.toLocaleString('default', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }),
    )
    return dateHour + ':' + dateMinute
  }
</script>

<div class="mt-6 grid grid-cols-6 bg-white shadow-md text-center">
  <p
    class=" flex font-bold text-md md:text-2xl text-forest-green justify-center my-auto p-4"
  >
    {date.toLocaleString('default', { day: '2-digit' })} <br />
    {date.toLocaleString('default', { month: 'long' })}
  </p>
  <div class="col-span-4 grid grid-cols-3 border-l-1 border-r-1 my-auto">
    <div>
      <p class="font-bold text-md md:text-2xl text-forest-green">
        {getDepartureTime()}
      </p>
      <p class="text-md md:text-lg">{bookingData.Start.Name}</p>
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
        {calculateFlightTimeLong(
          bookingData.Start.Coordinates,
          bookingData.Destination.Coordinates,
        )}
      </p>
    </div>
    <div>
      <p class="font-bold text-md md:text-2xl text-forest-green">
        {getTouchdownTime(
          bookingData.Start.Coordinates,
          bookingData.Destination.Coordinates,
          departureTime,
        )}
      </p>
      <p class="text-md md:text-lg">{bookingData.Destination.Name}</p>
    </div>
  </div>
  <p class=" flex font-bold text-md md:text-2xl justify-center my-auto">
    €449.18
  </p>
</div>
