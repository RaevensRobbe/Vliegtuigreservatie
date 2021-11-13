<script lang="ts">
    import { onMount } from 'svelte';
    import { get } from '../../composables/useApi';
    import seatsStore from '../../stores/pickSeatsStore'
    import Intertitle from '../../components/Intertitle.svelte'
    import Seat from '../../components/SeatComponent.svelte'
    import { debug, each } from 'svelte/internal';

    let loaded = false

    let businessSeats: number = 0

    $: busRows = 0
    $: busCols = 5

    let busGrid:number[] = [0,0]

    let test1:number[] = []

    let columnsLetterBus:string[] = ['A','B','','C','D']

    onMount(async () => {
        const getData:any = await get(`http://localhost:3001/api/v1/flight/seats/1`)
        //console.log(getData.Ticket)
        businessSeats = getData.Plane.BusinessSeats;

        let i:any

        //console.log(takenSeatsBus)

        if( businessSeats !== 0){
            gridLayout(businessSeats)
        }
        loaded = true
    })

    const gridLayout = (bus) => {

        busRows = bus / 4
        
        busGrid = [busRows, busCols]

        let i:number = 0

        while(i < busRows){
            i = i + 1
            test1.push(i)
        }

        test()
    }

    let array:number[] = []
    const test = () => {

		let i = 0
        console.log(`busRows ${busRows}`)
		while (i < busRows){
			i = i+1
			array.push(i)
		}
		console.log(`array ${array}`)
	}

    const testArray:any[] = [
        [1,'A'],
        [1, 'A'],
        [1, 'C']
    ]

    const coords = [1, 'A']

    const includesMultiDimension = (arr, coords) => {
        // console.log(arr)
        console.log(JSON.stringify(coords))

        console.log(JSON.stringify(arr))

        if(JSON.stringify(arr).includes(JSON.stringify(coords))){
            console.log(true)
            return true
        }else{
            console.log(false)
            return false
        }   
        
    }
    
    includesMultiDimension(testArray, coords)

</script>

<body class="mx-12">
    
   {#if loaded}
    <section >
            
        {#if busCols !== 0 && busRows !== 0}
            <div>
                <div class="grid grid-rows-1 grid-cols-{busCols} grid-flow-col place-items-center gap-2 mb-2">
                    {#each columnsLetterBus as colNr}
                        <p>{colNr}</p>
                    {/each}
                </div>

                <div class="grid grid-flow-col grid-cols-{busCols} grid-rows-{busRows} grid-flow-row place-items-center gap-2">
                    {#each array as teller}
                        {#each columnsLetterBus as colNr}
                            {#if colNr == ''}
                                <div>{teller}</div>
                            {:else}
                                <div>
                                    <Seat row={teller} column= {colNr} status = 'free'/>
                                </div>
                            {/if}   
                        {/each}
                    {/each}
                </div>
            </div>
        {/if}              
    </section>
   {/if}
</body>
