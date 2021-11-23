<script lang="ts">
  import { onMount } from 'svelte'
  import { get } from '../../composables/useApi'
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

  let busGrid: number[] = [0, 0]
  let ecoGrid: number[] = [0, 0]

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

  const miniOnMount = async () => {
    let getData: any
    // console.log(`FlightId: ${$FlightStore.departureFlight}`)
    // console.log($FlightStore)
    if (retourFlight) {
      getData = await get(
        // `http://localhost:3001/api/v1/flight/seats/${$FlightStore.retourFlight}`,
        `http://localhost:3001/api/v1/flight/seats/1`,
      )
      // console.log(getData)
    } else {
      getData = await get(
        // `http://localhost:3001/api/v1/flight/seats/${$FlightStore.departureFlight}`,
        `http://localhost:3001/api/v1/flight/seats/3`,
      )
      // console.log(getData)
    }

    economySeats = getData.Plane.EconomySeats
    businessSeats = getData.Plane.BusinessSeats

    let i: any
    let j: any

    if (retourFlight) {
      takenSeatsBus = []
      takenSeatsEco = []
    }

    for (i of getData.Ticket) {
      //console.log(i)
      for (j of i.Seat) {
        if (j.class == 'Business') {
          takenSeatsBus.push([j.row, j.column])
        } else if (j.class == 'Economy') {
          takenSeatsEco.push([j.row, j.column])
        }
      }
    }

    // console.log(takenSeatsEco)

    if (economySeats !== 0) {
      gridLayout(economySeats, businessSeats)
    }
  }

  onMount(async () => {
    miniOnMount()
  })

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

    busGrid = [busRows, busCols]
    ecoGrid = [ecoRows, ecoCols]

    // console.log(busGrid, ecoGrid)

    test()
    test2()
  }

  let arrayBus: number[] = []
  let arrayEco: number[] = []
  const test = () => {
    let i = 0
    if (retourFlight) arrayBus = []
    while (i < busRows) {
      i = i + 1
      arrayBus.push(i)
    }
  }

  const test2 = () => {
    if (retourFlight) arrayEco = []
    for (let i = 1; i <= ecoRows; i++) {
      arrayEco.push(i)
    }
  }

  const includesMultiDimension = (arr, coords) =>
    JSON.stringify(arr).includes(JSON.stringify(coords))

  const nextFlight = () => {
    // console.log('clicked')
    clicked = !clicked
    retourFlight = !retourFlight
    miniOnMount()
  }

  function goToOverview() {
    goto('/flight/flightOverview')
  }
</script>

<body class="mx-12">
  <div>
    <button>Go back</button>
  </div>
  <section class="grid grid-cols-3 grid-rows-1">
    <Intertitle titleName="Select your seat" />
    <div class="flex justify-between">
      <div class="flex items-center">
        <div class="w-12 h-12 bg-gray-300 mr-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-12 h-12 "
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
        <p>Unavailable</p>
      </div>
      <div class="flex items-center">
        <div class="w-12 h-12 bg-white border border-forest-green mr-2" />
        <p>Available</p>
      </div>

      <div class="flex items-center">
        <div class="w-12 h-12 bg-forest-green border mr-2" />
        <p>Selected</p>
      </div>
    </div>
  </section>

  <section class="grid grid-cols-2 grid-rows-1 mt-8">
    <div>
      <div class="flex flex-row">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-10 h-10 mr-2"
          viewBox="0 0 44.58 31.855"
        >
          <path
            id="bxs-plane-take-off"
            d="M45.3,36.3H4.348v4.551H45.3ZM3.189,14.749a3.663,3.663,0,0,1,4.633-2.318L18,15.826,36.2,9l4.551,2.275L27.1,20.377l9.1,4.551,9.1-4.551,2.275,2.275-9.1,9.1L5.378,19.341A3.666,3.666,0,0,1,3.189,14.749Z"
            transform="translate(-3 -9)"
            fill="#008066"
          />
        </svg>
        <h1 class="font-bold text-2xl text-forest-green">
          Take-off to Destination
        </h1>
      </div>

      <div class="grid grid-cols-3 grid-rows-1">
        <h2 class="font-bold text-lg my-auto">Passengers</h2>
        <div class="flex flex-col justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="22.866"
            viewBox="0 0 32 22.866"
          >
            <path
              id="bxs-plane-take-off"
              d="M4.633,28.6h29.4v3.267H4.633ZM34.864,13.127a2.63,2.63,0,0,0-3.325-1.664L24.233,13.9,11.166,9,7.9,10.633l9.8,6.533-6.533,3.267L4.633,17.166,3,18.8l6.533,6.533,23.76-8.91A2.632,2.632,0,0,0,34.864,13.127Z"
              transform="translate(-3 -9)"
              fill="#008066"
            />
          </svg>
          <p>{$FlightStore.departureCity} - {$FlightStore.destinationCity}</p>
        </div>
        <div class="flex flex-col justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="22.866"
            viewBox="0 0 32 22.866"
          >
            <path
              id="bxs-plane-take-off"
              d="M33.367,28.6H3.968v3.267h29.4ZM3.136,13.127a2.63,2.63,0,0,1,3.325-1.664L13.767,13.9,26.834,9,30.1,10.633l-9.8,6.533,6.533,3.267,6.533-3.267L35,18.8l-6.533,6.533-23.76-8.91A2.632,2.632,0,0,1,3.136,13.127Z"
              transform="translate(-3 -9)"
              fill="#686868"
            />
          </svg>
          <p>{$FlightStore.destinationCity} - {$FlightStore.departureCity}</p>
        </div>
      </div>

      <div class="grid grid-cols-3 grid-rows-1 mt-4">
        {#each $travelerStore as traveler}
          {#if retourFlight}
            <PassengersComponent
              bind:selectedPerson
              fN={traveler.firstName}
              lN={traveler.lastName}
              seatNrDep={traveler.seatNrDep}
              seatNrRet={traveler.seatNrRet}
              retour={true}
            />
          {:else}
            <PassengersComponent
              bind:selectedPerson
              fN={traveler.firstName}
              lN={traveler.lastName}
              seatNrDep={traveler.seatNrDep}
              seatNrRet={traveler.seatNrRet}
              retour={false}
            />
          {/if}
        {/each}
      </div>
      {#if retourFlight}
        <button
          type="submit"
          class="flex p-4 mt-4 justify-center items-center font-bold text-2xl text-white bg-forest-green rounded-xl hover:bg-cyprus-green"
          on:click={goToOverview}
        >
          <!--submit button -->
          Continue
        </button>
      {:else}
        <button
          on:click={nextFlight}
          type="submit"
          class="flex p-4 mt-4 justify-center items-center font-bold text-2xl text-white bg-forest-green rounded-xl hover:bg-cyprus-green"
        >
          <!--submit button -->
          Next flight
        </button>
      {/if}
    </div>

    {#if retourFlight}
      <section>
        <section>
          {#if busCols !== 0 && busRows !== 0}
            <h2 class="h-6 text-white bg-forest-green text-center my-2">
              Business Class - prijs
            </h2>
            <div>
              <div
                class="grid grid-cols-{busCols} grid-rows-1 place-items-center gap-2 mb-2"
              >
                {#each columnsLetterBus as colNrBus}
                  <p>{colNrBus}</p>
                {/each}
              </div>

              <div
                class="grid grid-cols-{busCols} grid-rows-{busRows} place-items-center gap-2"
              >
                {#each arrayBus as tellerBus}
                  {#each columnsLetterBus as colNr}
                    {#if colNr == ''}
                      <div>{tellerBus}</div>
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
            <h2 class="h-6 text-white bg-forest-green text-center my-2">
              Economy Class - prijs
            </h2>
            <div>
              <div>
                <div
                  class="grid grid-cols-{ecoCols} grid-rows-1 place-items-center gap-2 mb-2"
                >
                  {#each columnsLetterEco as colNrEco}
                    <p>{colNrEco}</p>
                  {/each}
                </div>
                <div
                  class="grid grid-cols-{ecoCols} grid-rows-{ecoRows} place-items-center gap-2"
                >
                  {#each arrayEco as tellerEco}
                    {#each columnsLetterEco as colNr}
                      {#if colNr == ''}
                        <div>{tellerEco}</div>
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
      </section>
    {:else}
      <section>
        <section>
          {#if busCols !== 0 && busRows !== 0}
            <h2 class="h-6 text-white bg-forest-green text-center my-2">
              Business Class - prijs
            </h2>
            <div>
              <div
                class="grid grid-cols-{busCols} grid-rows-1 place-items-center gap-2 mb-2"
              >
                {#each columnsLetterBus as colNrBus}
                  <p>{colNrBus}</p>
                {/each}
              </div>

              <div
                class="grid grid-cols-{busCols} grid-rows-{busRows} place-items-center gap-2"
              >
                {#each arrayBus as tellerBus}
                  {#each columnsLetterBus as colNr}
                    {#if colNr == ''}
                      <div>{tellerBus}</div>
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
            <h2 class="h-6 text-white bg-forest-green text-center my-2">
              Economy Class - prijs
            </h2>
            <div>
              <div>
                <div
                  class="grid grid-cols-{ecoCols} grid-rows-1 place-items-center gap-2 mb-2"
                >
                  {#each columnsLetterEco as colNrEco}
                    <p>{colNrEco}</p>
                  {/each}
                </div>
                <div
                  class="grid grid-cols-{ecoCols} grid-rows-{ecoRows} place-items-center gap-2"
                >
                  {#each arrayEco as tellerEco}
                    {#each columnsLetterEco as colNr}
                      {#if colNr == ''}
                        <div>{tellerEco}</div>
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
      </section>
    {/if}
  </section></body
>
