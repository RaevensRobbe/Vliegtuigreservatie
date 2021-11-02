<script lang="ts">
import { get } from "./../../composables/useApi";

import { onMount } from "svelte";

  let givenflights;
  let storageDate = "2021-11-30"
  let position;
  let flights = [];

  onMount(async()=>{
    givenflights = await get("http://localhost:3001/api/v1/flight/flightInfo/3/1")
    console.log(givenflights)

    let i = 0;

    givenflights.forEach(flight => {
      let dateTime = flight.Date.split('T')[0];
      if(dateTime == storageDate){
        // console.log("same date " + i)
        position = i
      }
      i++
    })

    for(let j = -3; j <3; j++){
      if(j===0){
        console.log(position)
        let flightInfo = await get(`http://localhost:3001/api/v1/flight/${givenflights[position].FlightId}`)
        flights.push(flightInfo)
      } else{
        console.log(position+j)
        let flightInfo = await get(`http://localhost:3001/api/v1/flight/${givenflights[position+j].FlightId}`)
        flights.push(flightInfo)
      }
    }
    console.log(flights)
  })
</script>

<main class="grid grid-cols-7">
{#if flights}
  <p>total flights: {flights.length}</p>
  {#each flights as flight}
    <div>
      <p>€{flight.Price}</p>
      <p>test</p>
    </div>
  {/each}
{:else}
  <p>loading</p>
{/if}
</main>