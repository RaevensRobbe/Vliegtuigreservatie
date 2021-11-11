<script lang="ts">
    import { onMount } from 'svelte';
	import Grid from './Grid.svelte';
    import { get } from '../../composables/useApi';
    import seatsStore from '../../stores/pickSeatsStore'
    import Intertitle from '../../components/Intertitle.svelte'
    import Seat from '../../components/SeatComponent.svelte'

    let economySeats: number  = 0
    let businessSeats: number = 0

    let ecoRows 
    let ecoCols = 0
    let busRows 
    let busCols = 5
    let ecoRowLenght = 3

    let ecoParts = 0

    let busGrid = [0,0]
    let ecoGrid = [0,0]


    const gridLayout = (eco, bus) => {
        if(eco >=  120){
            ecoParts = 2
            ecoRows = eco / (ecoParts * ecoRowLenght)
            ecoCols = ecoParts * ecoRowLenght + 1             
             
        }else{
            console.log('120+')
            ecoParts = 3
            ecoRows = eco / (ecoParts * ecoRowLenght)
            ecoCols = ecoParts * ecoRowLenght + 2 
        }

        busRows = bus / 4

        busGrid = [busRows, busCols]
        ecoGrid = [ecoRows, ecoCols]

        console.log(`business grid ${busGrid}`)
        console.log(`economy grid ${ecoGrid}`)
    }

    onMount(async () => {
        const getData:any = await get(`http://localhost:3001/api/v1/flight/plane/1`)
        economySeats = getData.Plane.EconomySeats;
        businessSeats = getData.Plane.BusinessSeats;
        seatsStore.set({
            ecoSeats: economySeats,
            bussSeats: businessSeats
        })
        console.log(economySeats)

        if( economySeats !== 0){
            gridLayout(economySeats, businessSeats)
        }
    })

    $: is_activeBus = Array(busGrid[0]).fill(0).map(_ => Array(busGrid[1]).fill(false))
    $: is_activeEco = Array(ecoGrid[0]).fill(0).map(_ => Array(ecoGrid[1]).fill(false))


    let start = [];
	let end = [];
	let hover_end = []
	let clicked = false;
	
	function select(i, j) {
		if (clicked) {
			end = [i, j];
		} else { 
			start = [i, j];
		}
		
		clicked = !clicked;
        console.log([i,j])
		check_active([i, j]);
	}

    function selectEco(i, j) {
		if (clicked) {
			end = [i, j];
		} else { 
			start = [i, j];
		}
		
		clicked = !clicked;
        console.log([i,j])
		check_activeEco([i, j]);
	}
	
	function hover(i, j) {
		if (!clicked) return;
		hover_end = [i, j];
		check_active(hover_end);
	}
	
	function is_in_range([i, j], [i2, j2]) {
		return ((i - start[0]) * (i - i2) <= 0) && 
			((j - start[1]) * (j - j2)<= 0)
	}
	
	function check_active (end) {
		is_activeBus = is_activeBus.map(
			(a, i) => a.map((_, j) => is_in_range([i, j], end)));
	}

    function check_activeEco (end) {
		is_activeBus = is_activeBus.map(
			(a, i) => a.map((_, j) => is_in_range([i, j], end)));
	}

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
    
    <section class="grid grid-rows-1 grid-cols-3 mt-8">

        <div class="flex flex-col w-3/4 justify-between">
            <div class="bg-white flex flex-col items-center">
                <h1 class="text-forest-green">Business Class</h1>
                <p>You get a private space, recline seats, unlimited food and drinks, early boarding and spacious seats</p>
                <h2>PRICING</h2>
            </div>

            <div class="bg-white flex flex-col items-center">
                <h1 class="text-forest-green">Economy Class</h1>
                <p>You get your preferred seat, food and drinks and early boarding</p>
                <h2>PRICING</h2>
            </div>

            <div></div>
        </div>

        <section >
            {#if busGrid != [0,0]}
                
                <div>
                    <div class="grid grid-cols-{busGrid[1]} grid-rows-{busGrid[0]} place-items-center gap-2">
                        {#each {length: busGrid[0]} as _, i (i)}
                            {#each {length: busGrid[1]} as _, j (j)}
                                {#if  j == 2}
                                    <div>{i}</div>
                                {:else}
                                    <div class:active={is_activeBus[i][j]}
                                        on:click={() => select(i,j)}>
                                        <Seat row={i} column= {j} status = 'free'/>
                                    </div>
                                {/if}
                            {/each}
                        {/each}
                    </div>
                </div>

            {/if}
        
    
            <div class="mt-8 mb-8"></div>
    
            {#if ecoGrid != [0,0]}
                <div>
                    <div>
                        <div class="grid grid-cols-{ecoGrid[1]} grid-rows-{ecoGrid[0]} place-items-center gap-2">
                            {#each {length: ecoGrid[0]} as _, i (i)}
                                {#each {length: ecoGrid[1]} as _, j (j)}
                                    {#if  j == 3}
                                        <div>{i}</div>
                                    {:else}
                                        <div class:active={is_activeEco[i][j]}
                                        on:click={() => selectEco(i,j)}>
                                            <Seat row={i} column= {j} status = 'free'
                                            />
                                        </div>
                                    {/if}
                                {/each}
                            {/each}
                        </div>
                    </div>
                </div>
            {/if}
        </section>

        <!-- <section>
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="44.58" height="31.855" viewBox="0 0 44.58 31.855">
                    <path id="bxs-plane-take-off" d="M45.3,36.3H4.348v4.551H45.3ZM3.189,14.749a3.663,3.663,0,0,1,4.633-2.318L18,15.826,36.2,9l4.551,2.275L27.1,20.377l9.1,4.551,9.1-4.551,2.275,2.275-9.1,9.1L5.378,19.341A3.666,3.666,0,0,1,3.189,14.749Z" transform="translate(-3 -9)" fill="#008066"/>
                  </svg>
                  <h1>flight to flight</h1>
            </div>

            <div>
                 
            </div>
        </section> -->

    </section>
</body>
