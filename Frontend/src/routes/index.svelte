<script lang="ts">
    import AppHeader from "../components/AppHeader.svelte";
    import AppFooter from "../components/AppFooter.svelte";
    import Intertitle from "../components/Intertitle.svelte";
    import FlightSearch from "../components/FlightSearch.svelte";
    export let name = "Robbe Raevens";
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
</section>

<AppFooter />