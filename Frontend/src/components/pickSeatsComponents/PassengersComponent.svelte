<script lang="ts">
  import passengerStore from '../../stores/selectPassengerStore'
  import { travelerStore } from '../../stores/travelerStore'
  export let fN: string
  export let lN: string
  export let seatNrDep: string
  export let seatNrRet: string
  export let retour: boolean
  //console.log(`${fN}`)

  let selected: boolean = false
  let selectedSeat: string = ''
  let index: number = 0
  let seatSelected: boolean = false
  export let selectedPerson: {
    fn: string
    ln: string
  } = {
    fn: '',
    ln: '',
  }

  const clicked = () => {
    selected = !selected

    setSelectedPassenger()
  }

  const setSelectedPassenger = () => {
    selectedPerson.fn = fN
    selectedPerson.ln = lN
    $passengerStore = {
      fn: fN,
      ln: lN,
    }
  }

  const checkSelected = currentStore => {
    //console.log(`currentStore: ${currentStore.fn}`)
    //console.log(`CurrentlySelected: ${fN}`)
    if (currentStore.fn !== fN) {
      selected = false
      //console.log(selected)
    }
  }

  const checkSelectedSeat = currentStore => {
    index = currentStore.findIndex(
      x => x.firstName === fN,
      y => y.lastName === lN,
    )
    // console.log(retour)

    if (retour) {
      seatSelected = false
    }

    //console.log(index)
    if (currentStore[index] === undefined) {
      return
    } else {
      if (retour) {
        selectedSeat = currentStore[index].seatNrRet
        seatSelected = true
      } else {
        selectedSeat = currentStore[index].seatNrDep
        seatSelected = true
      }
    }
  }

  let checkStatePassenger = passengerStore.subscribe(currentStore => {
    checkSelected(currentStore)
  })

  let checkStateAdult = travelerStore.subscribe(currentStore => {
    checkSelectedSeat(currentStore)
  })
</script>

<div
  class="flex flex-col pl-2 {selected ? 'border-l-8 border-forest-green' : ''}"
>
  <h1
    class="text-forest-green text-2xl{selected ? 'font-bold text-2xl' : ''}"
    on:click={clicked}
  >
    {fN}
    {lN}
  </h1>
  {#if selectedSeat[index] === undefined}
    <p class="text-tomato-red">Select your seat</p>
  {:else if seatSelected}
    <p class="text-cyprus-green">Seat selected</p>
  {:else}
    <p class="text-tomato-red">Select your seat</p>
  {/if}
</div>

<div class="flex justify-center">
  <div class="w-12 h-12 {retour ? 'bg-white' : 'bg-forest-green'}">
    <h1
      class="w-full flex h-full items-center justify-center {retour
        ? 'text-forest-green'
        : 'text-white'} font-bold text-center text-xl"
    >
      {seatNrDep}
    </h1>
  </div>
</div>

<div class="flex justify-center">
  <div class="w-12 h-12 {retour ? 'bg-forest-green' : 'bg-white'}">
    <h1
      class="w-full flex h-full items-center justify-center {retour
        ? 'text-white'
        : 'text-forest-green'} font-bold text-center text-xl"
    >
      {seatNrRet}
    </h1>
  </div>
</div>
