<script lang="ts">
  import { onMount } from 'svelte'
  import { init } from 'svelte/internal'
  import { adultStore, childrenStore } from '../../stores/travelerStore'

  export let row: number
  export let column: string
  export let status: string
  export let person: {
    fn: string
    ln: string
  }
  export let classType: string
  export let retour: boolean

  let initials: string
  let selected: boolean = false
  let index: number = 0

  onMount(() => {
    //console.log(row, column)
  })
  const clicked = () => {
    initials = `${person.fn[0]}${person.ln[0]}`
    selected = !selected
    addSeatToStore()
  }

  const addSeatToStore = () => {
    index = $adultStore.findIndex(
      x => x.firstName === person.fn,
      y => y.lastName === person.ln,
    )
    let selectedSeat: string = `${row}${column}`
    let prevData = $adultStore[index]

    let seatDep: string
    let seatRet: string

    if (retour) {
      if (prevData.seatNrRet == selectedSeat) {
        seatRet = ''
      } else seatRet = selectedSeat

      $adultStore[index] = {
        title: prevData.title,
        firstName: prevData.firstName,
        lastName: prevData.lastName,
        seatNrDep: prevData.seatNrDep,
        classDep: prevData.classDep,
        seatNrRet: seatRet,
        classRet: classType,
      }
    } else {
      seatDep = selectedSeat
      if (prevData.seatNrDep == selectedSeat) {
        seatDep = ''
      } else seatDep = selectedSeat

      $adultStore[index] = {
        title: prevData.title,
        firstName: prevData.firstName,
        lastName: prevData.lastName,
        seatNrDep: seatDep,
        classDep: classType,
        seatNrRet: prevData.seatNrRet,
        classRet: prevData.classRet,
      }
    }

    console.log($adultStore[index])
  }

  const checkSelected = (currentStore, index) => {
    let thisSeatNr = `${row}${column}`
    if (retour) {
      if (currentStore[index].seatNrRet !== thisSeatNr) {
        selected = false
      }
    } else {
      if (currentStore[index].seatNrDep !== thisSeatNr) {
        selected = false
      }
    }
  }

  let checkState = adultStore.subscribe(currentStore => {
    checkSelected(currentStore, index)
  })
</script>

{#if status === 'taken'}
  <div class="w-12 h-12 bg-gray-300">
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
{:else}
  <div
    class="w-12 h-12 bg-white border border-forest-green {selected
      ? 'bg-forest-green'
      : 'bg-white'}"
    on:click={clicked}
  >
    {#if selected}
      <h1
        class="w-full flex h-full items-center justify-center text-white font-bold text-center text-xl"
      >
        {initials}
      </h1>
    {/if}
  </div>
{/if}
