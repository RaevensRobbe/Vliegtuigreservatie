<script lang="ts">
    import { onMount } from 'svelte'
    import {adultStore, childrenStore} from '../../stores/travelerStore'
  
    export let row: number
    export let column: string
    export let status: string
    export let person:{
      fn:string,
      ln:string
    }
    let selected:boolean = false
    let index:number = 0

    onMount(() => { 
        //console.log(row, column)
    })

    const clicked = () => {
        selected = !selected
        addSeatToStore()
    }

    const addSeatToStore = () => {
        index = $adultStore.findIndex(x => x.firstName === person.fn)
        let selectedSeat:string = `${row}${column}`
        let prevData = $adultStore[index]
        $adultStore[index] = {
            title: prevData.title,
            firstName: prevData.firstName,
            lastName: prevData.lastName,
            seatNr: selectedSeat
        }
        //console.log($adultStore[index])
    }

    const checkSelected = (currentStore, index) => {
        let thisSeatNr = `${row}${column}`
        if(currentStore[index].seatNr !== thisSeatNr) {
            selected = false
        }
    }

    let checkState = adultStore.subscribe((currentStore) => {
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
    <div class="w-12 h-12 bg-white border border-forest-green {selected?'bg-forest-green':'bg-white'}" on:click={clicked} >
        {#if selected}
            <h1
            class="w-full flex h-full items-center justify-center text-black font-bold text-center text-xl"
            >
                {row}
                {column}
            </h1>
        {/if}
    </div>
{/if}