<script lang="ts">
    import passengerStore from '../../stores/selectPassengerStore'
    import {adultStore, childrenStore} from '../../stores/travelerStore'
    export let fN:string
    export let lN:string
    export let seatNr:string
    //console.log(`${fN}`)

    let selected:boolean = false
    let selectedSeat:string = ''
    let index:number = 0
    let test:boolean = false
    export let selectedPerson:{
        fn:string,
        ln:string
    } = {
        fn : '',
        ln : ''
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
            ln: lN
        }
    }

    const checkSelected = (currentStore) => {
        //console.log(`currentStore: ${currentStore.fn}`)
        //console.log(`CurrentlySelected: ${fN}`)
        if(currentStore.fn !== fN){
            selected = false
            //console.log(selected)
        }
    }

    const checkSelectedSeat = (currentStore) => {
        index = currentStore.findIndex(x => x.firstName === fN)
        //console.log(index)
        if(currentStore[index] === undefined){
            return
        }else{
            //console.log(fN)
            selectedSeat = currentStore[index].seatNr
            test = true
            //console.log(selectedSeat, currentStore[index].firstName)
        }
    }

    let checkStatePassenger = passengerStore.subscribe((currentStore) => {
        checkSelected(currentStore)
    })

    let checkStateAdult = adultStore.subscribe((currentStore) => {
      checkSelectedSeat(currentStore)
    })

</script>

<div class="flex flex-col pl-2 {selected?'border-l-8 border-forest-green':''}">
    <h1 class="text-forest-green text-2xl{selected?'font-bold text-2xl':''}" on:click={clicked}>{fN} {lN}</h1>
    {#if selectedSeat[index] === undefined}
        <p class="text-tomato-red">Select your seat</p>
    {:else if test}
        <p class="text-cyprus-green">Seat selected</p>
    {:else}
        <p class="text-tomato-red">Select your seat</p>
    {/if}
</div>

<div class="flex justify-center">
    <div class="w-12 h-12 bg-forest-green">
        <h1
        class="w-full flex h-full items-center justify-center text-white font-bold text-center text-xl"
    >
        {seatNr}
    </h1>
    </div>
</div>

<div class="flex justify-center">
    <div class="w-12 h-12 bg-white border border-forest-green ">
        <h1
        class="w-full flex h-full items-center justify-center text-white font-bold text-center text-xl"
        >
            {seatNr}
        </h1>
    </div>
</div>