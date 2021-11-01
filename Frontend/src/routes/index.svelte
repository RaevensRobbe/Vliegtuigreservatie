<script lang="ts">
  //@ts-nocheck
  import AppHeader from '../components/AppHeader.svelte'
  import AppFooter from '../components/AppFooter.svelte'
  import Intertitle from '../components/Intertitle.svelte'
  import FlightSearch from '../components/FlightSearch.svelte'
  import PopularDestinationCard from '../components/PopularDestinationCard.svelte'
  import type PopularDestination from '../models/PopularDestinationModel.type'

  export let name = 'Robbe Raevens'
  //@ts-ignore
  export const populardestinations: PopularDestination = [
    {
      Name: 'Malawi',
      Dest: [
        {
          DestinationId: 20,
          Name: 'Berlin',
          Popularity: '10',
          Picture:
            'https://images.unsplash.com/photo-1469796466635-455ede028aca?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fHNhbnRvcmluaXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        },
      ],
    },
    {
      Name: 'Romania',
      Dest: [
        {
          DestinationId: 13,
          Name: 'Albuquerque',
          Popularity: '15',
          Picture:
            'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1740&q=80',
        },
      ],
    },
    {
      Name: 'El Salvador',
      Dest: [
        {
          DestinationId: 12,
          Name: 'San Jose',
          Popularity: '15',
          Picture:
            'https://images.unsplash.com/photo-1505761671935-60b3a7427bad?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1740&q=80',
        },
      ],
    },
    {
      Name: 'Cuba',
      Dest: [
        {
          DestinationId: 1,
          Name: 'Colorado Springs',
          Popularity: '17',
          Picture:
            'https://images.unsplash.com/photo-1517882823369-e638bfcc33e9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80',
        },
      ],
    },
    {
      Name: 'The Bahamas',
      Dest: [
        {
          DestinationId: 4,
          Name: 'San Bernardino',
          Popularity: '18',
          Picture: '',
        },
      ],
    },
    {
      Name: 'Belgium',
      Dest: [
        {
          DestinationId: 15,
          Name: 'Kansas City',
          Popularity: '20',
          Picture: '',
        },
      ],
    },
  ]
</script>

<svelte:head>
  <title>MCT Airlines</title>
</svelte:head>

<AppHeader {name} />

<section class=" bg-image-mainpage bg-cover w-full h-auto bg-bottom py-36">
  <FlightSearch />
</section>

<section class="p-4 px-6 align-start">
  <Intertitle titleName="Popular destinations" />
  <section
    class="grid grid-cols-1 md:grid-cols-2  
    lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 mb-4 auto-cols-fr"
  >
    {#each populardestinations as destination}
      <PopularDestinationCard popularDestination={destination} />
    {/each}
  </section>
</section>

<AppFooter />
