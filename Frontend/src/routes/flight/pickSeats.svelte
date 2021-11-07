<script lang="ts">
    import { onMount } from 'svelte';
	import Grid from './Grid.svelte';
    import { get } from '../../composables/useApi';
    import seatsStore from '../../stores/pickSeatsStore'
    import Intertitle from '../../components/Intertitle.svelte'

    let economySeats: number  = 0
    let businessSeats: number = 0

    let ecoRows 
    let ecoCols = 3
    let busRows 
    let busCols = 2

    let ecoParts = 0

    let busGrid = [0,0]
    let ecoGrid = [0,0]


    const gridLayout = (eco, bus) => {
        if(eco >=  120){
            ecoParts = 2
            ecoRows = (eco / ecoParts) / 3
             
        }else{
            console.log('120+')
            ecoParts = 3
            ecoRows = (eco / ecoParts) /3
        }

        busRows = (bus / busCols) / 2

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
		check_active([i, j]);
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
		is_active = is_active.map(
			(a, i) => a.map((_, j) => is_in_range([i, j], end)));
	}

</script>

<section class="grid grid-cols-3 grid-rows-1">
    <Intertitle titleName = "Select your seat"/>
    <div class="flex justify-between">
        <p>Unavailable</p>
        <p>Available</p>
        <p>Selected</p>
    </div>
</section>

<section>
    {#if busGrid != [0,0]}
        <div class="grid grid-rows-1 grid-cols-2">
            <div class="container grid grid-cols-{busGrid[1]} grid-rows-{busGrid[0]}">
                {#each {length: busGrid[0]} as _, i (i)}
                    {#each {length: busGrid[1]} as _, j (j)}
                        <div class:active={is_activeBus[i][j]}
                            on:click={() => select(i, j)}
                            on:mouseover={() => hover(i, j)}
                        >{i}</div>
                    {/each}
                {/each}
            </div>

        
            <div class="container grid grid-cols-{busGrid[1]} grid-rows-{busGrid[0]}">
                {#each {length: busGrid[0]} as _, i (i)}
                    {#each {length: busGrid[1]} as _, j (j)}
                        <div class:active={is_activeBus[i][j]}
                                on:click={() => select(i, j)}
                                on:mouseover={() => hover(i, j)}
                            >{i}</div>
                    {/each}
                {/each}
            </div>
        </div>
    {/if}

    <div class="mt-8 mb-8"></div>

    {#if ecoGrid != [0,0]}
        <div class="grid grid-rows-1 grid-cols-{ecoParts}">
            {#if ecoParts === 2}
                <div class="container grid grid-cols-{ecoGrid[1]} grid-rows-{ecoGrid[0]} w-1/2">
                    {#each {length: ecoGrid[0]} as _, i (i)}
                        {#each {length: ecoGrid[1]} as _, j (j)}
                            <div class:active={is_activeEco[i][j]}
                                    on:click={() => select(i, j)}
                                    on:mouseover={() => hover(i, j)}
                                >{i}</div>
                        {/each}
                    {/each}
                </div>

                <div class="container grid grid-cols-{ecoGrid[1]} grid-rows-{ecoGrid[0]} w-1/2">
                    {#each {length: ecoGrid[0]} as _, i (i)}
                        {#each {length: ecoGrid[1]} as _, j (j)}
                            <div class:active={is_activeEco[i][j]}
                                    on:click={() => select(i, j)}
                                    on:mouseover={() => hover(i, j)}
                                >{i}</div>
                        {/each}
                    {/each}
                </div>
            {:else if ecoParts === 3}
                <div class="container grid grid-cols-{ecoGrid[1]} grid-rows-{ecoGrid[0]}">
                    {#each {length: ecoGrid[0]} as _, i (i)}
                        {#each {length: ecoGrid[1]} as _, j (j)}
                            <div class:active={is_activeEco[i][j]}
                                    on:click={() => select(i, j)}
                                    on:mouseover={() => hover(i, j)}
                                >test</div>
                        {/each}
                    {/each}
                </div>

                <div class="container grid grid-cols-{ecoGrid[1]} grid-rows-{ecoGrid[0]}">
                    {#each {length: ecoGrid[0]} as _, i (i)}
                        {#each {length: ecoGrid[1]} as _, j (j)}
                            <div class:active={is_activeEco[i][j]}
                                    on:click={() => select(i, j)}
                                    on:mouseover={() => hover(i, j)}
                                >test</div>
                        {/each}
                    {/each}
                </div>

                <div class="container grid grid-cols-{ecoGrid[1]} grid-rows-{ecoGrid[0]}">
                    {#each {length: ecoGrid[0]} as _, i (i)}
                        {#each {length: ecoGrid[1]} as _, j (j)}
                            <div class:active={is_activeEco[i][j]}
                                    on:click={() => select(i, j)}
                                    on:mouseover={() => hover(i, j)}
                                >test</div>
                        {/each}
                    {/each}
                </div>
            {/if}
        </div>
    {/if}
</section>
