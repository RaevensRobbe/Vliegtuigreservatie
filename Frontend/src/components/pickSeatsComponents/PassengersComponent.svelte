<script lang="ts">
  import passengerStore from '../../stores/selectPassengerStore'
  import { travelerStore } from '../../stores/travelerStore'
  import { fade, scale } from 'svelte/transition'
  export let fN: string
  export let lN: string
  export let seatNrDep: string
  export let seatNrRet: string
  export let retour: boolean
  export let lastItem: boolean
  export let hasRetour: boolean

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
    //console.log(selected)
    setSelectedPassenger()
  }

  //De geselecteerde persoon opslaan in een store
  const setSelectedPassenger = () => {
    selectedPerson.fn = fN
    selectedPerson.ln = lN
    $passengerStore = {
      fn: fN,
      ln: lN,
    }
  }

  //Checken of de geselecteerde persoon dezelfde is al in de store
  const checkSelected = currentStore => {
    console.log(`currentstore ${currentStore.fn}`)
    console.log(`Nieuw ${fN}`)
    if (currentStore.fn !== fN && currentStore.ln !== lN) {
      selected = false
    }else{
      selected = true
    }
  }

  //Kijken welke seat bij de geselecteerde persoon staat
  const checkSelectedSeat = currentStore => {
    index = currentStore.findIndex(
      x => x.firstName === fN,
      y => y.lastName === lN,
    )

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

  //Deze functie wordt uitgevoerd als er iets in de passengerStore verandert
  let checkStatePassenger = passengerStore.subscribe(currentStore => {
    checkSelected(currentStore)
  })

  //Deze functie wordt uitgevoerd als er iets in de travellerStore verandert
  let checkStateAdult = travelerStore.subscribe(currentStore => {
    checkSelectedSeat(currentStore)
  })
</script>

<div
  class="flex flex-col col-span-2 {selected
    ? 'border-l-8 border-forest-green'
    : ''} cursor-pointer"
  on:click={clicked}
>
  <div class={lastItem? '' : 'border-b-1'}>
    <div class="p-4">
      <h1
        class="text-forest-green text-lg md:text-2xl {selected
          ? 'font-bold'
          : ''}"
      >
        {fN}
        {lN}
      </h1>
      {#if selectedSeat[index] === undefined}
        <p class="text-tomato-red text-sm md:text-base">Select your seat</p>
      {:else if seatSelected}
        <p class="text-cyprus-green text-sm md:text-base">Seat selected</p>
      {:else}
        <p class="text-tomato-red text-sm md:text-base">Select your seat</p>
      {/if}
    </div>
  </div>
</div>

<div
  class="{retour
    ? 'bg-white'
    : ' bg-whisper-gray'} flex justify-center {lastItem ? '' : 'border-b-1'}"
>
  <div class="flex justify-center my-auto">
    <div
      class="w-12 h-12 {seatNrDep ? 'bg-forest-green' : 'bg-white border-2'}"
    >
      <h1
        class="w-full flex h-full items-center justify-center {seatNrDep
          ? 'text-white'
          : 'text-forest-green'} font-bold text-center text-xl"
        in:scale
      >
        {seatNrDep}
      </h1>
    </div>
  </div>
</div>
{#if hasRetour}
  <div
    class="{retour ? 'bg-whisper-gray' : 'bg-white'} flex justify-center {lastItem
      ? ''
      : 'border-b-1'}"
  >
    <div class="flex justify-center my-auto">
      <div
        class="w-12 h-12 {seatNrRet ? 'bg-forest-green' : 'bg-white border-2'} "
      >
        <h1
          class="w-full flex h-full items-center justify-center {seatNrRet
            ? 'text-white'
            : 'text-forest-green'} font-bold text-center text-xl"
          in:scale
        >
          {seatNrRet}
        </h1>
      </div>
    </div>
  </div>
{/if}
