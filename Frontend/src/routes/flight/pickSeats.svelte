<script lang="ts">
  import { onMount } from 'svelte'
  import { get } from '../../utils/useApi'
  import Intertitle from '../../components/Intertitle.svelte'
  import Seat from '../../components/pickSeatsComponents/SeatComponent.svelte'
  import { travelerStore } from '../../stores/travelerStore'
  import { FlightStore } from '../../stores/FlightStore'
  import PassengersComponent from '../../components/pickSeatsComponents/PassengersComponent.svelte'
  import { goto } from '$app/navigation'

  let economySeats: number = 0
  let businessSeats: number = 0

  let ecoRows: number = 0
  let ecoCols: number = 0
  let busRows: number = 0
  let busCols: number = 5
  let ecoRowLenght: number = 3

  let ecoParts: number = 0

  let takenSeatsEco: any[] = []
  let takenSeatsBus: any[] = []

  let columnsLetterBus: string[] = ['A', 'B', '', 'C', 'D']
  let columnsLetterEco: string[] = []

  let selectedPerson: {
    fn: string
    ln: string
  }

  let retourFlight: boolean = false
  let clicked: boolean = false

  const GetData = async () => {
    let getData: any
    if (retourFlight) {
      getData = await get(
        `http://localhost:3001/api/v1/flight/takenSeats/${$FlightStore.retourFlight}`,
      )
      if (getData.error === 'Data is undefined') {
        getData = await get(
          `http://localhost:3001/api/v1/flight/seatsInfo/${$FlightStore.retourFlight}`,
        )
      }
    } else {
      getData = await get(
        `http://localhost:3001/api/v1/flight/takenSeats/${$FlightStore.departureFlight}`,
      )
      if (getData.error === 'Data is undefined') {
        getData = await get(
          `http://localhost:3001/api/v1/flight/seatsInfo/${$FlightStore.departureFlight}`,
        )
      }
    }

    economySeats = getData.Plane.EconomySeats
    businessSeats = getData.Plane.BusinessSeats

    let i: any
    let j: any

    //Empty the data to refill the grid
    if (retourFlight) {
      takenSeatsBus = []
      takenSeatsEco = []
    }

    //Check for taken seats
    if (getData.Ticket !== undefined) {
      //Save taken seats in array's
      for (i of getData.Ticket) {
        for (j of i.Seat) {
          if (j.class == 'Business') {
            takenSeatsBus.push([j.row, j.column])
          } else if (j.class == 'Economy') {
            takenSeatsEco.push([j.row, j.column])
          }
        }
      }
    }

    //Check is there is data to make grid
    if (economySeats !== 0 && businessSeats !== 0) {
      gridLayout(economySeats, businessSeats)
    }
  }

  let departureAbr: string = $FlightStore.departureAbbreviation
  let destinationAbr: string = $FlightStore.destinationAbbreviation
  if (destinationAbr == null) {
    destinationAbr = $FlightStore.destinationCity.substr(0, 3).toUpperCase()
  }

  onMount(async () => {
    if ($FlightStore.retourFlight === null) {
      retourFlight = false
    } else {
      retourFlight = true
    }

    GetData()
  })

  //De layout van het vliegtuig maken
  const gridLayout = (eco, bus) => {
    if (eco >= 120) {
      ecoParts = 2
      ecoRows = eco / (ecoParts * ecoRowLenght)
      ecoCols = ecoParts * ecoRowLenght + 1
      columnsLetterEco = ['A', 'B', 'C', '', 'D', 'E', 'F']
    } else {
      console.log('120+')
      ecoParts = 3
      ecoRows = eco / (ecoParts * ecoRowLenght)
      ecoCols = ecoParts * ecoRowLenght + 2
      columnsLetterEco = ['A', 'B', 'C', '', 'D', 'E', 'F', '', 'G', 'H', 'I']
    }

    busRows = bus / 4

    RowTellerBus()
    RowTellerEco()
  }

  let arrayBus: number[] = []
  let arrayEco: number[] = []

  //Zorgen dat rijen bij 1 beginnen impv 0 voor Business plaatsen
  const RowTellerBus = () => {
    let i = 0
    if (retourFlight) arrayBus = []
    while (i < busRows) {
      i = i + 1
      arrayBus.push(i)
    }
  }

  //Zorgen dat rijen bij 1 beginnen impv 0 voor Economy plaatsen
  const RowTellerEco = () => {
    if (retourFlight) arrayEco = []
    for (let i = 1; i <= ecoRows; i++) {
      arrayEco.push(i)
    }
  }

  //Check if the coords from a seat are in an array (these are 2 demensional)
  const includesMultiDimension = (arr, coords) =>
    JSON.stringify(arr).includes(JSON.stringify(coords))

  const nextFlight = () => {
    clicked = !clicked
    retourFlight = !retourFlight
    GetData()
  }

  function goToOverview() {
    goto('/flight/flightOverview')
  }

  function goBack() {
    goto('/flight/flightDate')
  }
</script>

<body class="">
  <section
    class="p-4 flex hover:cursor-pointer hover:font-bold"
    on:click={goBack}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6 my-auto"
      viewBox="0 0 20.828 37.657"
    >
      <path
        id="chevron-down"
        d="M6,9,22,25,38,9"
        transform="translate(27 -3.172) rotate(90)"
        fill="none"
        stroke="#686868"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="4"
      />
    </svg>
    <p class="">Go back</p>
  </section>
  <section class="sm:p-4 px-6">
    <Intertitle titleName="Select your seat" />
  </section>

  <section class="grid grid-cols-5 grid-rows-1 p-4 px-6">
    <div class="w-5/6 md:w-4/5 mx-auto col-span-5 lg:col-span-2">
      <div class="flex flex-row">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-10 mr-2"
          viewBox="0 0 44.58 31.855"
        >
          <path
            id="bxs-plane-take-off"
            d="M4.633,28.6h29.4v3.267H4.633ZM34.864,13.127a2.63,2.63,0,0,0-3.325-1.664L24.233,13.9,11.166,9,7.9,10.633l9.8,6.533-6.533,3.267L4.633,17.166,3,18.8l6.533,6.533,23.76-8.91A2.632,2.632,0,0,0,34.864,13.127Z"
            transform="translate(-3 -9)"
            fill="#008066"
          />
        </svg>
        <h1 class="font-bold text-lg md:text-2xl text-forest-green mb-4">
          {#if retourFlight}
            {$FlightStore.departureCity} to {$FlightStore.destinationCity}
          {:else}
            {$FlightStore.destinationCity} to {$FlightStore.departureCity}
          {/if}
        </h1>
      </div>
      <div class="bg-white shadow-md">
        <div class="grid grid-cols-4 grid-rows-1 text-dim-gray border-b-1">
          <h2 class="font-bold text-base md:text-lg  my-auto px-4 col-span-2">
            Passengers
          </h2>
          <div
            class="flex flex-col justify-center items-center py-4 {retourFlight
              ? ''
              : 'text-forest-green border-b-8 border-current'}"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="22.866"
              viewBox="0 0 32 22.866"
              class={retourFlight
                ? 'text-dim-gray fill-current'
                : 'text-forest-green fill-current'}
            >
              <path
                id="bxs-plane-take-off"
                d="M4.633,28.6h29.4v3.267H4.633ZM34.864,13.127a2.63,2.63,0,0,0-3.325-1.664L24.233,13.9,11.166,9,7.9,10.633l9.8,6.533-6.533,3.267L4.633,17.166,3,18.8l6.533,6.533,23.76-8.91A2.632,2.632,0,0,0,34.864,13.127Z"
                transform="translate(-3 -9)"
              />
            </svg>
            <p class="mt-1 text-sm md:text-base">
              {departureAbr} - {destinationAbr}
            </p>
          </div>
          <div
            class="flex flex-col justify-center items-center {retourFlight
              ? 'text-forest-green border-b-8 border-current'
              : ''}"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="22.866"
              viewBox="0 0 32 22.866"
              class={retourFlight
                ? 'text-forest-green fill-current'
                : 'text-dim-gray fill-current'}
            >
              <path
                id="bxs-plane-take-off"
                d="M33.367,28.6H3.968v3.267h29.4ZM3.136,13.127a2.63,2.63,0,0,1,3.325-1.664L13.767,13.9,26.834,9,30.1,10.633l-9.8,6.533,6.533,3.267,6.533-3.267L35,18.8l-6.533,6.533-23.76-8.91A2.632,2.632,0,0,1,3.136,13.127Z"
                transform="translate(-3 -9)"
              />
            </svg>
            <p class="mt-1 text-sm md:text-base">
              {destinationAbr} - {departureAbr}
            </p>
          </div>
        </div>
        <div class="grid grid-cols-4 grid-rows-1">
          {#each $travelerStore as traveler, index (traveler)}
            {#if retourFlight}
              <PassengersComponent
                bind:selectedPerson
                fN={traveler.firstName}
                lN={traveler.lastName}
                seatNrDep={traveler.seatNrDep}
                seatNrRet={traveler.seatNrRet}
                retour={true}
                lastItem={index == $travelerStore.length - 1 ? true : false}
              />
            {:else}
              <PassengersComponent
                bind:selectedPerson
                fN={traveler.firstName}
                lN={traveler.lastName}
                seatNrDep={traveler.seatNrDep}
                seatNrRet={traveler.seatNrRet}
                retour={false}
                lastItem={index == $travelerStore.length - 1 ? true : false}
              />
            {/if}
          {/each}
        </div>
      </div>
      {#if retourFlight}
        <div class="flex justify-center md:justify-end">
          <button
            type="submit"
            class="flex p-2 md:p-4 my-4 justify-center items-center font-bold text-lg md:text-2xl text-white bg-forest-green rounded-xl hover:bg-cyprus-green"
            on:click={goToOverview}
          >
            <!--submit button -->
            Continue
          </button>
        </div>
      {:else}
        <div class="flex justify-center md:justify-end">
          <button
            on:click={nextFlight}
            type="submit"
            class="flex p-2 md:p-4 my-4 justify-center items-center font-bold text-lg md:text-2xl text-white bg-forest-green rounded-xl hover:bg-cyprus-green"
          >
            Next flight
          </button>
        </div>
      {/if}
    </div>

    {#if retourFlight}
      <section class="col-span-5 lg:col-span-3 w-5/6 md:w-4/5 mx-auto">
        <div class="grid-rows-2">
          <div class="flex justify-between p-4">
            <div class="flex items-center flex-col gap-2 lg:flex-row">
              <div class="w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-gray-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16"
                  viewBox="0 0 24 24"
                  stroke="#ffffff"
                  stroke-width="1"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  ><line x1="18" y1="6" x2="6" y2="18" /><line
                    x1="6"
                    y1="6"
                    x2="18"
                    y2="18"
                  /></svg
                >
              </div>
              <p class="font-semibold text-sm md:text-base">Unavailable</p>
            </div>
            <div class="flex items-center gap-2 flex-col lg:flex-row">
              <div
                class="w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-white border border-forest-green"
              />
              <p class="font-semibold text-sm md:text-base">Available</p>
            </div>

            <div class="flex items-center gap-2 flex-col lg:flex-row">
              <div
                class="w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-forest-green border"
              />
              <p class="font-semibold text-sm md:text-base">Selected</p>
            </div>
          </div>
          <section class="bg-white p-4 shadow-md">
            {#if busCols !== 0 && busRows !== 0}
              <h2 class="p-1 text-white bg-forest-green text-center my-2">
                Business Class: <span class="font-bold"
                  >€{$FlightStore.retourPrice}</span
                >
              </h2>
              <div>
                <div
                  class="grid grid-cols-{busCols} grid-rows-1 place-items-center gap-2 mb-2"
                >
                  {#each columnsLetterBus as colNrBus}
                    <p class="text-forest-green font-bold">{colNrBus}</p>
                  {/each}
                </div>

                <div
                  class="grid grid-cols-{busCols} grid-rows-{busRows} place-items-center gap-2"
                >
                  {#each arrayBus as tellerBus}
                    {#each columnsLetterBus as colNr}
                      {#if colNr == ''}
                        <div class="text-forest-green font-bold">
                          {tellerBus}
                        </div>
                      {:else}
                        <div>
                          {#if includesMultiDimension( takenSeatsBus, [tellerBus, colNr], )}
                            <Seat
                              row={tellerBus}
                              column={colNr}
                              status="taken"
                              person={selectedPerson}
                              classType="Business"
                              retour={true}
                            />
                          {:else}
                            <Seat
                              row={tellerBus}
                              column={colNr}
                              status="free"
                              person={selectedPerson}
                              classType="Business"
                              retour={true}
                            />
                          {/if}
                        </div>
                      {/if}
                    {/each}
                  {/each}
                </div>
              </div>
            {/if}

            <div class="mt-8 mb-8" />

            {#if ecoCols !== 0 && ecoRows !== 0}
              <h2 class="p-1 text-white bg-forest-green text-center my-2">
                Economy Class: <span class="font-bold"
                  >€{$FlightStore.retourPrice}</span
                >
              </h2>
              <div>
                <div>
                  <div
                    class="grid grid-cols-{ecoCols} grid-rows-1 place-items-center gap-2 mb-2"
                  >
                    {#each columnsLetterEco as colNrEco}
                      <p class="text-forest-green font-bold">{colNrEco}</p>
                    {/each}
                  </div>
                  <div
                    class="grid grid-cols-{ecoCols} grid-rows-{ecoRows} place-items-center gap-2"
                  >
                    {#each arrayEco as tellerEco}
                      {#each columnsLetterEco as colNr}
                        {#if colNr == ''}
                          <div class="text-forest-green font-bold">
                            {tellerEco}
                          </div>
                        {:else}
                          <div>
                            {#if includesMultiDimension(takenSeatsEco, `[${tellerEco},'${colNr}']`)}
                              <Seat
                                row={tellerEco}
                                column={colNr}
                                status="taken"
                                person={selectedPerson}
                                classType="Economy"
                                retour={true}
                              />
                            {:else}
                              <Seat
                                row={tellerEco}
                                column={colNr}
                                status="free"
                                person={selectedPerson}
                                classType="Economy"
                                retour={true}
                              />
                            {/if}
                          </div>
                        {/if}
                      {/each}
                    {/each}
                  </div>
                </div>
              </div>
            {/if}
          </section>
        </div>
      </section>
    {:else}
      <section class="col-span-5 lg:col-span-3 w-11/12 md:w-4/5 mx-auto ">
        <div class="grid-rows-2">
          <div class="flex justify-between p-4">
            <div class="flex items-center flex-col gap-2 lg:flex-row">
              <div class="w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-gray-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 "
                  viewBox="0 0 24 24"
                  stroke="#ffffff"
                  stroke-width="1"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  ><line x1="18" y1="6" x2="6" y2="18" /><line
                    x1="6"
                    y1="6"
                    x2="18"
                    y2="18"
                  /></svg
                >
              </div>
              <p class="font-semibold text-sm md:text-base">Unavailable</p>
            </div>
            <div class="flex items-center gap-2 flex-col lg:flex-row">
              <div
                class="w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-white border border-forest-green"
              />
              <p class="font-semibold text-sm md:text-base">Available</p>
            </div>

            <div class="flex items-center gap-2 flex-col lg:flex-row">
              <div
                class="w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-forest-green border"
              />
              <p class="font-semibold text-sm md:text-base">Selected</p>
            </div>
          </div>
          <section class="bg-white p-4 shadow-md">
            {#if busCols !== 0 && busRows !== 0}
              <h2 class="p-1 text-white bg-forest-green text-center my-2">
                Business Class: <span class="font-bold"
                  >€{$FlightStore.departurePrice * 4}</span
                >
              </h2>
              <div>
                <div
                  class="grid grid-cols-{busCols} grid-rows-1 place-items-center gap-2 mb-2"
                >
                  {#each columnsLetterBus as colNrBus}
                    <p class="text-forest-green font-bold text-xl">
                      {colNrBus}
                    </p>
                  {/each}
                </div>

                <div
                  class="grid grid-cols-{busCols} grid-rows-{busRows} place-items-center gap-y-2.5 gap-x-1"
                >
                  {#each arrayBus as tellerBus}
                    {#each columnsLetterBus as colNr}
                      {#if colNr == ''}
                        <div class="text-forest-green font-bold text-xl">
                          {tellerBus}
                        </div>
                      {:else}
                        <div>
                          {#if includesMultiDimension( takenSeatsBus, [tellerBus, colNr], )}
                            <Seat
                              row={tellerBus}
                              column={colNr}
                              status="taken"
                              person={selectedPerson}
                              classType="Business"
                              retour={false}
                            />
                          {:else}
                            <Seat
                              row={tellerBus}
                              column={colNr}
                              status="free"
                              person={selectedPerson}
                              classType="Business"
                              retour={false}
                            />
                          {/if}
                        </div>
                      {/if}
                    {/each}
                  {/each}
                </div>
              </div>
            {/if}

            <div class="mt-8 mb-8" />

            {#if ecoCols !== 0 && ecoRows !== 0}
              <h2 class="p-1 text-white bg-forest-green text-center my-2">
                Economy Class: <span class="font-bold"
                  >€{$FlightStore.departurePrice}</span
                >
              </h2>
              <div>
                <div>
                  <div
                    class="grid grid-cols-{ecoCols} grid-rows-1 place-items-center gap-y-2 gap-x-1"
                  >
                    {#each columnsLetterEco as colNrEco}
                      <p class="text-forest-green font-bold text-xl p-2">
                        {colNrEco}
                      </p>
                    {/each}
                  </div>
                  <div
                    class="grid grid-cols-{ecoCols} grid-rows-{ecoRows} place-items-center gap-y-2.5"
                  >
                    {#each arrayEco as tellerEco}
                      {#each columnsLetterEco as colNr}
                        {#if colNr == ''}
                          <div class="text-forest-green font-bold text-xl">
                            {tellerEco}
                          </div>
                        {:else}
                          <div>
                            {#if includesMultiDimension(takenSeatsEco, `[${tellerEco},'${colNr}']`)}
                              <Seat
                                row={tellerEco}
                                column={colNr}
                                status="taken"
                                person={selectedPerson}
                                classType="Economy"
                                retour={false}
                              />
                            {:else}
                              <Seat
                                row={tellerEco}
                                column={colNr}
                                status="free"
                                person={selectedPerson}
                                classType="Economy"
                                retour={false}
                              />
                            {/if}
                          </div>
                        {/if}
                      {/each}
                    {/each}
                  </div>
                </div>
              </div>
            {/if}
          </section>
        </div>
      </section>
    {/if}
  </section>
</body>
