<script lang="ts">
    import { onMount } from 'svelte';
    import { get } from '../../composables/useApi';
    import Intertitle from '../../components/Intertitle.svelte'
    import Seat from '../../components/SeatComponent.svelte'

    let economySeats: number  = 0
    let businessSeats: number = 0

    let ecoRows:number = 0
    let ecoCols:number = 0
    let busRows:number = 0
    let busCols:number = 5
    let ecoRowLenght:number = 3

    let ecoParts:number = 0

    let busGrid:number[] = [0,0]
    let ecoGrid:number[] = [0,0]

    let takenSeatsEco:any = {}
    let takenSeatsBus:any[] = []

    let columnsLetterBus:string[] = ['A','B','','C','D']
    let columnsLetterEco:string[] = [] 

    onMount(async () => {
        const getData:any = await get(`http://localhost:3001/api/v1/flight/seats/1`)
        //console.log(getData.Ticket)
        economySeats = getData.Plane.EconomySeats;
        businessSeats = getData.Plane.BusinessSeats;

        let i:any
        let j:any

        for(i of getData.Ticket){
            //console.log(i)
            for(j of i.Seat){
                if(j.class == "Business"){
                    takenSeatsBus.push([j.row,j.column])

                }else if(j.class == "Economy"){
                    takenSeatsEco.push([j.row,j.column])
                }
            }
        }

        console.log(takenSeatsBus)

        if( economySeats !== 0){
            gridLayout(economySeats, businessSeats)
        }
        
    })

    const gridLayout = (eco, bus) => {
        //console.log('test')
        if(eco >=  120){
            ecoParts = 2
            ecoRows = eco / (ecoParts * ecoRowLenght)
            ecoCols = ecoParts * ecoRowLenght + 1   
            columnsLetterEco = ['A','B','C','','D','E','F']        
             
        }else{
            console.log('120+')
            ecoParts = 3
            ecoRows = eco / (ecoParts * ecoRowLenght)
            ecoCols = ecoParts * ecoRowLenght + 2 
            columnsLetterEco = ['A','B','C','','D','E','F','','G','H','I']
        }

        busRows = bus / 4
        
        busGrid = [busRows, busCols]
        ecoGrid = [ecoRows, ecoCols]

        test()
        test2()
    }  

    let arrayBus:number[] = []
    let arrayEco:number[] = []
    const test = () => {

		let i = 0
        // console.log(`busRows ${busRows}`)
		while (i < busRows){
			i = i+1
			arrayBus.push(i)
		}
		// console.log(`arrayBuss ${arrayBus}`)
	}

    const test2 = () => {

        // console.log(`ecoRows ${ecoRows}`)
        for(let i = 1; i <= ecoRows; i++){
            arrayEco.push(i)
        }
        // console.log(`arrayEco ${arrayEco}`)
    }

    const includesMultiDimension = (arr, coords) => 
        JSON.stringify(arr).includes(JSON.stringify(coords))

</script>

<body class="mx-12">
    <div>
        <button>Go back</button>
    </div>
    <section class="grid grid-cols-3 grid-rows-1">
        <Intertitle titleName = "Select your seat"/>
        <div class="flex justify-between">
            <div class="flex items-center">
                <div class="w-12 h-12 bg-gray-300 mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 " viewBox="0 0 24 24" stroke="#ffffff" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </div>
                <p>Unavailable</p>
            </div>
            <div class="flex items-center">
                <div class="w-12 h-12 bg-white border border-forest-green mr-2"/>
                <p>Available</p>
            </div>

            <div class="flex items-center">
                <div class="w-12 h-12 bg-forest-green border mr-2"/>
                <p>Selected</p>
            </div>
        </div>
    </section>
    
    <section class="grid grid-cols-2 grid-rows-1 mt-8">

        <div>
            <div class="flex flex-row">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 mr-2" viewBox="0 0 44.58 31.855">
                    <path id="bxs-plane-take-off" d="M45.3,36.3H4.348v4.551H45.3ZM3.189,14.749a3.663,3.663,0,0,1,4.633-2.318L18,15.826,36.2,9l4.551,2.275L27.1,20.377l9.1,4.551,9.1-4.551,2.275,2.275-9.1,9.1L5.378,19.341A3.666,3.666,0,0,1,3.189,14.749Z" transform="translate(-3 -9)" fill="#008066"/>
                  </svg>
                  <h1 class="font-bold text-2xl text-forest-green">Take-off to Destination</h1>
            </div>

            <div class="grid grid-cols-4 grid-rows-4">
                 
            </div>
        </div>

        <section >
            <section >
                {#if busCols !== 0 && busRows !== 0}
                    <h2 class ="h-6 text-white bg-forest-green text-center my-2">Business Class - prijs</h2>
                    <div>
                        <div class="grid grid-cols-{busCols} grid-rows-1 place-items-center gap-2 mb-2">
                            {#each columnsLetterBus as colNrBus}
                                <p>{colNrBus}</p>
                            {/each}
                        </div>
    
                        <div class="grid grid-cols-{busCols} grid-rows-{busRows} place-items-center gap-2">
                            {#each arrayBus as tellerBus}
                                {#each columnsLetterBus as colNr}
                                    {#if colNr == ''}
                                        <div>{tellerBus}</div>
                                    {:else}
                                        <div>
                                            {#if includesMultiDimension(takenSeatsBus, [tellerBus, colNr])}
                                                <Seat row={tellerBus} column= {colNr} status = 'taken'/>
                                            {:else}
                                                <Seat row={tellerBus} column= {colNr} status = 'free'/>
                                            {/if}
                                        </div>
                                    {/if}   
                                {/each}
                            {/each}
                        </div>
                    </div>
    
                {/if}
            
                <div class="mt-8 mb-8"></div>
        
                {#if ecoCols !== 0 && ecoRows !== 0}
                    <h2 class ="h-6 text-white bg-forest-green text-center my-2">Economy Class - prijs</h2>
                    <div>
                        <div>
                            <div class="grid grid-cols-{ecoCols} grid-rows-1 place-items-center gap-2 mb-2">
                                {#each columnsLetterEco as colNrEco}
                                    <p>{colNrEco}</p>
                                {/each}
                            </div>
                            <div class="grid grid-cols-{ecoCols} grid-rows-{ecoRows} place-items-center gap-2">
                                {#each arrayEco as tellerEco}
                                    {#each columnsLetterEco as colNr }
                                        {#if  colNr == ''}
                                            <div>{tellerEco}</div>
                                        {:else}
                                            <div>
                                                {#if includesMultiDimension(takenSeatsEco,`[${tellerEco},'${colNr}']`)}
                                                    <Seat row={tellerEco} column={colNr} status = 'taken'/>
                                                {:else}
                                                    <Seat row={tellerEco} column={colNr} status = 'free'/>
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
</body>
