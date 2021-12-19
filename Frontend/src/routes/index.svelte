<script lang="ts">
  //@ts-nocheck
  import Spinner from './../components/animations/spinner.svelte'
  import Intertitle from '../components/Intertitle.svelte'
  import FlightSearch from '../components/FlightSearch.svelte'
  import PopularDestinationCard from '../components/popularDestinationComponents/PopularDestinationCard.svelte'
  import popularCompStore from './../stores/popularCompStore'
  import { onMount } from 'svelte'
  import type PopularDestination from '../models/PopularDestinationModel.type'
  import PopularDestinationModal from '../components/popularDestinationComponents/PopularDestinationModal.svelte'
  import Lazy from 'svelte-lazy'
  import languageStore from '../stores/languageStore'

  import { get } from '../utils/useApi'

  import { _ } from '../utils/i18n'
  import { init } from 'svelte-i18n';
  
  init({
      fallbackLocale: 'en',
      initialLocale: $languageStore.language,
    })

  let popDestinations: PopularDestination = []
  let popDestinationsLoaded: boolean = false
  onMount(async () => {
    popDestinations = await get('http://localhost:3001/api/v1/country/popular')
    // console.log(popDestinations)
    popDestinationsLoaded = true
  })
</script>

<svelte:head>
  <title>MCT Airlines</title>
</svelte:head>

<Lazy height={300}>
  <section class="bg-image-mainpage bg-cover w-full h-auto bg-bottom py-36">
    <FlightSearch />
  </section>
</Lazy>

<section class="m-4 px-6 align-start">
  <Intertitle titleName= {$_('home.popular')} />
  <article
    class="grid grid-cols-1 md:grid-cols-2  
  lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 mb-4 auto-cols-fr"
  >
    {#if popDestinationsLoaded == true}
      {#each popDestinations as destination}
        <PopularDestinationCard popularDestination={destination} />
      {/each}
    {:else}
      <div class="w-full h-full flex justify-center my-auto col-span-full">
        <Spinner />
      </div>
    {/if}
  </article>
</section>

{#if $popularCompStore.showPopular}
  <PopularDestinationModal />
{/if}
