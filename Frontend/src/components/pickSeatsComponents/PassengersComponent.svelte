<script lang="ts">
    export let fN:string
    export let lN:string
    export let seatNr:string
    console.log(`${fN}`)

    let clicked = false

    export let selectedPerson:{
        fn:string,
        ln:string
    } = {
        fn : '',
        ln : ''
    }

    const selectPassenger = () => {
        clicked = !clicked
        if(clicked == true) {
            selectedPerson.fn = fN
            selectedPerson.ln = lN
        }else{
            selectedPerson.fn = ''
            selectedPerson.ln = ''
        }
        console.log(clicked)
        console.log(selectedPerson)
    }
</script>

<div class="flex flex-col" >
    <h1 class="font-bold text-lg text-forest-green" on:click={selectPassenger}>{fN} {lN}</h1>
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