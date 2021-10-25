<script lang="ts">
    import AppHeader from "../components/AppHeader.svelte";
    import AppFooter from "../components/AppFooter.svelte";
    import Intertitle from "../components/Intertitle.svelte";
    import FlightSearch from "../components/FlightSearch.svelte";
    import PopularDestinationCard from "../components/PopularDestinationCard.svelte";
    import type PopularDestination from "../models/PopularDestinationModel.type";

    export let name = "Robbe Raevens";
    //@ts-ignore
    export const populardestinations: PopularDestination = [
    {
      Name:"Malawi",
      Dest:[
         {
            DestinationId:20,
            Name:"Berlin",
            Popularity:"10",
            Picture:""
         }
      ]
   },
   {
      Name:"Romania",
      Dest:[
         {
            DestinationId:13,
            Name:"Albuquerque",
            Popularity:"15",
            Picture:""
         }
      ]
   },
   {
      Name:"El Salvador",
      Dest:[
         {
            DestinationId:12,
            Name:"San Jose",
            Popularity:"15",
            Picture:""
         }
      ]
   },
   {
      Name:"Cuba",
      Dest:[
         {
            DestinationId:1,
            Name:"Colorado Springs",
            Popularity:"17",
            Picture:""
         }
      ]
   },
   {
      Name:"The Bahamas",
      Dest:[
         {
            DestinationId:4,
            Name:"San Bernardino",
            Popularity:"18",
            Picture:""
         }
      ]
   },
   {
      Name:"Belgium",
      Dest:[
         {
            DestinationId:15,
            Name:"Kansas City",
            Popularity:"20",
            Picture:""
         }
      ]
   }
 ] ;

 console.log(populardestinations);
</script>

<svelte:head>
    <title>MCT Airlines</title>
</svelte:head>

<AppHeader name={name} />

<section class=" bg-image-mainpage bg-cover w-full h-auto bg-bottom py-36">
    <FlightSearch />
</section>

<section class="p-6 align-start mb-auto">
    <Intertitle titleName="Popular destinations" />
    <section class="grid grid-cols-1 md:grid-cols-2  
    lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {#each populardestinations as destination}
        <PopularDestinationCard popularDestination={destination} />
        {/each}
    </section>
</section>

<AppFooter />