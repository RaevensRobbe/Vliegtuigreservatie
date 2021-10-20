<script>
    import AppHeader from "../components/AppHeader.svelte";
    export let name = "John Doe";
</script>

<svelte:head>
    <title>MCT Airlines</title>
</svelte:head>

<AppHeader name={name} />
<h1 class=" text-2xl font-bold">Homepage</h1>
