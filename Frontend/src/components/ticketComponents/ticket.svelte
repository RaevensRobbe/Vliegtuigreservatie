<script lang="ts">
  export let travelerData: any
  export let flightData: any
  export let retour: boolean
  let flightClass: string
  let seat: string
  let departureTime: string
  let boardingTime: string

  let date: Date = new Date(flightData.Date)
  let day: string = date.toLocaleString('default', {
    day: '2-digit',
  })
  let month: string = date.toLocaleString('default', {
    month: 'short',
  })
  let formatedDate: string = day + month

  function getDepartureTime() {
    let tempDate = new Date(date)
    //.slice 2 gives back last 2 characters => you can always add 0 in front if its higher than 10 it wil not show the 0 in front
    let hours = ('0' + tempDate.getHours()).slice(-2)
    let minutes = ('0' + tempDate.getMinutes()).slice(-2)
    departureTime = hours + ':' + minutes

    getBoardingTime()
    return departureTime
  }

  function getBoardingTime() {
    var oldDateObj = new Date(flightData.Date)
    var newDateObj = new Date(flightData.Date)
    newDateObj.setMinutes(oldDateObj.getMinutes() - 30)
    console.log(newDateObj)
    //.slice 2 gives back last 2 characters => you can always add 0 in front if its higher than 10 it wil not show the 0 in front
    let hours = ('0' + newDateObj.getHours()).slice(-2)
    let minutes = ('0' + newDateObj.getMinutes()).slice(-2)
    boardingTime = hours + ':' + minutes
  }

  if (retour) {
    flightClass = travelerData.classRet
    seat = travelerData.seatNrRet
  } else {
    flightClass = travelerData.classDep
    seat = travelerData.seatNrDep
  }
  //@ts-ignore
  import Barcode from 'svelte-barcode'
</script>

<div class="flex flex-col bg-white rounded-xl my-4 mx-6">
  <div class="bg-forest-green grid grid-cols-7 text-white rounded-t-xl">
    <h1 class="font-bold text-2xl md:text-4xl col-span-3 md:col-span-3 p-4">
      MCT Airlines
    </h1>
    <div class="col-span-4 md:col-span-2 my-auto">
      <div class="p-4 grid grid-rows-2 justify-items-end text-right">
        <p>Boarding pass</p>
        <p>{flightClass}</p>
      </div>
    </div>
    <div class="col-span-2 border-l-2 border-dashed hidden md:grid">
      <div class="p-4 grid grid-rows-2">
        <p>Boarding pass</p>
        <p>{flightClass}</p>
      </div>
    </div>
  </div>
  <div class="grid grid-cols-7">
    <div class="col-span-7 md:col-span-3 p-4">
      <div class="grid grid-rows-3 gap-4">
        <div>
          <p class="text-sm">Passenger name</p>
          <p class="text-black uppercase text-xl">
            {travelerData.firstName}
            {travelerData.lastName}
          </p>
        </div>
        <div>
          <p class="text-sm">From</p>
          <p class="text-black uppercase text-xl">{flightData.Start.Name}</p>
        </div>
        <div>
          <p class="text-sm">To</p>
          <p class="text-black uppercase text-xl">
            {flightData.Destination.Name}
          </p>
        </div>
        <div
          class="overflow-x-hidden hidden xs:block sm:block md:hidden lg:block"
        >
          <Barcode
            value={`${travelerData.lastName}`}
            elementTag={'canvas'}
            width="2"
            height="70"
            displayValue="false"
            background=""
            marginLeft="0"
            marginRight="0"
          />
        </div>
        <div class="overflow-x-hidden xs:hidden sm:hidden md:block lg:hidden">
          <Barcode
            value={`${travelerData.lastName}`}
            elementTag={'canvas'}
            width="1"
            height="70"
            displayValue="false"
            background=""
            marginLeft="0"
            marginRight="0"
          />
        </div>
      </div>
    </div>
    <div class="col-span-7 md:col-span-2 p-4">
      <div class="grid grid-rows-3 gap-4">
        <div class="grid grid-cols-2">
          <div>
            <p class="text-sm">Date</p>
            <p class="text-black uppercase text-xl">{formatedDate}</p>
          </div>
          <div>
            <p class="text-sm">Time</p>
            <p class="text-black uppercase text-xl">{getDepartureTime()}</p>
          </div>
        </div>
        <div class="grid grid-cols-2">
          <div>
            <p class="text-sm">Flight</p>
            <p class="text-black uppercase text-xl">{flightData.Name}</p>
          </div>
          <div>
            <p class="text-sm">Seat</p>
            <p class="text-black uppercase text-xl">{seat}</p>
          </div>
        </div>
        <div class="grid grid-cols-2">
          <div>
            <p class="text-sm">Gate</p>
            <p class="text-black uppercase text-xl">{flightData.Gate}</p>
          </div>
          <div>
            <p class="text-sm">Board till</p>
            <p class="text-black uppercase text-xl">{boardingTime}</p>
          </div>
        </div>
      </div>
    </div>
    <div
      class="col-span-7 md:col-span-2 p-4 border-t-2 md:border-t-0 md:border-l-2 border-dashed"
    >
      <div class="grid grid-rows-3 gap-4">
        <div>
          <p class="text-sm">Passenger name</p>
          <p class="text-black uppercase">
            {travelerData.firstName}
            {travelerData.lastName}
          </p>
        </div>
        <div>
          <p class="text-sm">From</p>
          <p class="text-black uppercase">BRUSSEL-ZAVENTEM</p>
        </div>
        <div>
          <p class="text-sm">To</p>
          <p class="text-black uppercase">Milan Malpensa</p>
        </div>
        <div class="grid grid-cols-3">
          <div>
            <p class="text-sm">Time</p>
            <p class="text-black uppercase">{departureTime}</p>
          </div>
          <div>
            <p class="text-sm">Seat</p>
            <p class="text-black uppercase">{seat}</p>
          </div>
          <div>
            <p class="text-sm">Board till</p>
            <p class="text-black uppercase">{boardingTime}</p>
          </div>
        </div>
        <div class="grid grid-cols-3">
          <div>
            <p class="text-sm">Gate</p>
            <p class="text-black uppercase">{flightData.Gate}</p>
          </div>
          <div>
            <p class="text-sm">Date</p>
            <p class="text-black uppercase">{formatedDate}</p>
          </div>
          <div>
            <p class="text-sm">Flight</p>
            <p class="text-black uppercase">{flightData.Name}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
