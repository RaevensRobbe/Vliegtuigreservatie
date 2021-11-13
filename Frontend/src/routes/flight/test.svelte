<script lang="ts">
    import { onMount } from 'svelte';
    import { get } from '../../composables/useApi';
    import seatsStore from '../../stores/pickSeatsStore'
    import Intertitle from '../../components/Intertitle.svelte'
    import Seat from '../../components/SeatComponent.svelte'
import { debug, each } from 'svelte/internal';

    let businessSeats: number = 0

    let busRows:number = 0
    let busCols:number = 5

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

</script>

<body class="mx-12">
    
    <section >
        {#if busCols !== 0 && busRows !== 0}
            <div>
                <div class="grid grid-cols-{busCols} grid-rows-1 place-items-center gap-2 mb-2">
                    {#each columnsLetterBus as colNr}
                        <p>{colNr}</p>
                    {/each}
                </div>
    
                <div class="grid grid-cols-{busCols} grid-rows-{busRows} place-items-center gap-2">
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
</body>
