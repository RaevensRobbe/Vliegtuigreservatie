<script lang="ts">
import { get } from "./../../composables/useApi";

import { onMount } from "svelte";

  let givenflights;
  let storageDate = "2021-11-30"
  let position;
  let flights = new Array();
  let loaded = false;

  onMount(async()=>{
    givenflights = await get("http://localhost:3001/api/v1/flight/flightInfo/3/1")
    // console.log(givenflights)

    let i = 0;

    givenflights.forEach(flight => {
      let dateTime = flight.Date.split('T')[0];
      if(dateTime == storageDate){
        // console.log("same date " + i)
        position = i
      }
      i++
    })

    i=0
    for(let j = -3; j <4; j++){
      if(j===0){
        // console.log(position)
        let flightInfo = await get(`http://localhost:3001/api/v1/flight/${givenflights[position].FlightId}`)
        flights.push(flightInfo)
      } else{
        // console.log(position+j)
        let flightInfo = await get(`http://localhost:3001/api/v1/flight/${givenflights[position+j].FlightId}`)
        flights.push(flightInfo)
      }
      i++
    }
    console.log(flights)
    loaded = true
  })

  function calculatedayname(date) {
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var d = new Date(date);
    return days[d.getDay()]
  }
</script>

<main class="grid grid-cols-7 border-r-0 items-end">
{#if loaded}
  {#each flights as flight}
    <label key={flight.FlightId}>
      <input
      type="radio"
      name="city"
      id={flight.FlightId}
      value={flight.Date}
      class="peer hidden"
      />
      <div class="bg-white border-forest-green peer-checked:border-t-8 align-bottom">
        <div class="bg-white border-r-1 border-l-1 flex flex-col justify-items-end  text-center shadow-md justify-end">
          <p class="text-forest-green font-bold m-2 text-xl">{calculatedayname(flight.Date.split("T")[0])}</p>
          <p class="">{flight.Date.split("T")[0]}</p>
          <p class="text-cyprus-green font-bold m-2 text-xl">€{flight.Price}</p>
        </div>
      </div>
    </label>
  {/each}
{:else}
  <p>loading</p>
{/if}
</main>