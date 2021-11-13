<script lang='ts'>
import { each } from "svelte/internal";

	export let grid = [8, 4];
	
	$: col = `repeat(${grid[1]}, 1fr)`;
	$: row = `repeat(${grid[0]}, 1fr)`;
	// $: is_active = Array(grid[0]).fill(0).map(_ => Array(grid[1]).fill(false));
	
	let start = [];
	let end = [];
	let hover_end = []
	let clicked = false;

	let columnsLetterBus:string[] = ['A','B','C','D']
	
	function select(i, j) {
		if (clicked) {
			end = [i, j];
		} else { 
			start = [i, j];
		}
		
		clicked = !clicked;
	}
	

	let array:number[] = []

	const test = () => {
		let lenght = {length: grid[0]}
		let i = 0
		
		console.log(lenght.length)
		while (i < lenght.length){
			i = i+1
			array.push(i)
		}
		console.log(array)
	}

	test()

	
    const includesMultiDimension = (arr, coords) =>
        JSON.stringify(arr).includes(coords);
	
	
</script>

<div class="container" style="grid-template-rows: {row}; grid-template-columns: {col};">
	{#each array as teller}
		<p>{teller}</p>
	{/each}

</div>
<p></p>
<strong>Current: </strong>{hover_end}<br>
<strong>Coords:</strong> {start} {end[0] ? '-' : ''} {end}
<style>
	.container {
		display: grid;
		border: 1px solid #999;
		border-radius: 2px;
		width: 200px;
		height: 200px;
		grid-gap: 1px;
		background: #999;
	} 
	
	.container div {
		background: #fff;
	}	
	
	div.active {
		background: orange;
	}
</style>