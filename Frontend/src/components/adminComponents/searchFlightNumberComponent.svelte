<script lang="ts">
  export let flightNumber: string
  let tempFlightNumber: string

  function handleSubmit() {
    flightNumber = flightNumber
    console.log(flightNumber)
  }
</script>

<form
  class="flex justify-center w-3/4 lg:w-3/5 xl:w-1/2 mx-auto"
  on:submit|preventDefault={handleSubmit}
>
  <div class="bg-white rounded-l-xl col-span-2 flex">
    <input
      type="text"
      placeholder="Search flight number"
      class="p-4 rounded-l-xl"
    />
  </div>
  <button
    class="bg-forest-green text-white font-bold text-2xl p-4 rounded-r-xl hover:bg-cyprus-green cursor-pointer"
  >
    Search
  </button>
</form>
