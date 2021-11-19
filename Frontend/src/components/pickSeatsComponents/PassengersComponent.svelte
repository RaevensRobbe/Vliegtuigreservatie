<script lang="ts">
    import passengerStore from '../../stores/selectPassengerStore'
    export let fN:string
    export let lN:string
    export let seatNr:string
    console.log(`${fN}`)

    let selected = false

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
        console.log(`currentStore: ${currentStore.fn}`)
        console.log(`CurrentlySelected: ${fN}`)
        if(currentStore.fn !== fN){
            selected = false
            console.log(selected)
        }
    }

    let checkState = passengerStore.subscribe((currentStore) => {
        checkSelected(currentStore)
    })

</script>

<div class="flex flex-col pl-2 {selected?'border-l-8 border-forest-green':''}">
    <h1 class="text-forest-green text-2xl{selected?'font-bold text-2xl':''}" on:click={clicked}>{fN} {lN}</h1>
    <p>Select your seat</p>
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