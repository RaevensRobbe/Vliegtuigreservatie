<script lang="ts">
    import { onMount } from 'svelte';
	import Grid from './Grid.svelte';
    import { get } from '../../composables/useApi';
    import seatsStore from '../../stores/pickSeatsStore'

    let economySeats: number  = 0
    let businessSeats: number = 0

    let ecoRows 
    let ecoCols 
    let busRows 
    let busCols = 2

    let busGrid = []
    let ecoGrid = []

    let grid = [8,4]

    const gridLayout = (eco, bus) => {
        // console.log(`GridLayout ${eco}`)
        if(eco >=  120){
            // console.log('120 of minder')
            ecoRows = (eco / 2) /2
            ecoCols = 2
        }else{
            console.log('120+')
            ecoRows = (eco / 3) /3
            ecoCols = 3
        }

        busRows = (bus / busCols) / 2

        busGrid = [busRows, busCols]
        ecoGrid = [ecoRows, ecoCols]
        console.log(`ecoGrid ${ecoGrid}`)
        console.log(`busGrid ${busGrid}`)
    }

    onMount(async () => {
        const getData:any = await get(`http://localhost:3001/api/v1/flight/plane/1`)
        economySeats = getData.Plane.EconomySeats;
        businessSeats = getData.Plane.BusinessSeats;
        seatsStore.set({
            ecoSeats: economySeats,
            bussSeats: businessSeats
        })

        // console.log(`seats hoger dan 0? ${economySeats}`)
        if( economySeats !== 0){
            gridLayout(economySeats, businessSeats)
        }
    })

</script>

<div>
	<span>
		<label for="rows">bussSeats</label>
		<input bind:value={businessSeats} type="number"/>
	</span>
	<span>
		<label for="columns">economySeats</label>
		<input bind:value={economySeats} type="number"/>
	</span>
</div>

<Grid {grid} />
    



<style>
	div {
		display: flex;
		width: 200px;
		justify-content: space-between;
	}
	
	div span:first-child {
		margin-right: 20px;
	}
	
	input {
		width: 100%
	}
</style>