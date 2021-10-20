<script>
    import AppHeader from "../components/AppHeader.svelte";
    import AppFooter from "../components/AppFooter.svelte";
    import Intertitle from "../components/Intertitle.svelte";
    export let name = "John Doe";
</script>

<svelte:head>
    <title>MCT Airlines</title>
</svelte:head>

<AppHeader name={name} />

<section class="px-6">
    <Intertitle titleName="Popular destinations" />
</section>

<AppFooter />