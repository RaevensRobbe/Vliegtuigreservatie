<script lang="ts">
  //@ts-nocheck
  import AppHeader from '../components/AppHeader.svelte'
  import AppFooter from '../components/AppFooter.svelte'
  import Intertitle from '../components/Intertitle.svelte'
  import FlightSearch from '../components/FlightSearch.svelte'
  import PopularDestinationCard from '../components/PopularDestinationCard.svelte'
  import { onMount } from "svelte";
  import type PopularDestination from '../models/PopularDestinationModel.type'

  import {get} from './../composables/useApi'
  
  let popDestinations:PopularDestination = [];

  onMount(async () => {      
    popDestinations = await get('http://localhost:3001/api/v1/country/popular')
  })


</script>

<svelte:head>
  <title>MCT Airlines</title>
</svelte:head>

<section class="bg-image-mainpage bg-cover w-full h-auto bg-bottom py-36">
    <FlightSearch />
</section>

<section class="p-4 px-6 align-start">
  <Intertitle titleName="Popular destinations" />
  <article
    class="grid grid-cols-1 md:grid-cols-2  
    lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 mb-4 auto-cols-fr"
  >
  {#if popDestinations}
    {#each popDestinations as destination}
      <PopularDestinationCard popularDestination={destination} />
    {/each}
  {:else}
    <p>Loading</p>
  {/if}
  </article>
</section>
