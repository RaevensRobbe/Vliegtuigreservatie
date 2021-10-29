<script>
  export let children
  export let adults
  export let toggleTravelers
  function showTravelers() {
    console.log(toggleTravelers)
    toggleTravelers = !toggleTravelers
  }
  function calculateTravelers(operation, travler) {
    console.log(operation + ' ' + travler)
    if (travler == 'children') {
      if (operation == '+') {
        children++
      } else {
        if (children > 0) {
          children--
        }
      }
    } else {
      if (operation == '+') {
        adults++
      } else {
        if (adults > 0) {
          adults--
        }
      }
    }
  }
</script>

<div class="absolute top-18 justify-center">
  <div class="flex flex-col align-center">
    <div class="w-6 overflow-hidden inline-block self-center">
      <div class=" h-4 w-4 bg-white rotate-45 transform origin-bottom-left" />
    </div>
    <div class="bg-white rounded-xl shadow-md p-2">
      <div class="flex justify-between items-end mb-2">
        <div class="mr-4">
          <p class="text-lg font-bold text-forest-green">Adults</p>
          <p class="text-xs">16+ years at the time of flight</p>
        </div>
        <div class="flex gap-2 align-bottom">
          <div
            class="flex justify-center self-center border-forest-green border h-6 w-6 rounded-full hover:bg-forest-green hover:text-white"
          >
            <div
              class="text-xl text-forest-green self-center hover:text-white cursor-pointer"
              on:click={() => calculateTravelers('-', 'adults')}
            >
              -
            </div>
          </div>
          <span class="justify-center text-xl font-bold text-forest-green"
            >{adults}</span
          >
          <div
            class="flex justify-center self-center border-forest-green border h-6 w-6 rounded-full hover:bg-forest-green "
          >
            <div
              class="text-xl text-forest-green self-center hover:text-white cursor-pointer"
              on:click={() => calculateTravelers('+', 'adults')}
            >
              +
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-between items-end mb-2">
        <div>
          <p class="text-lg font-bold text-forest-green">Children</p>
          <p class="text-xs">-16 at the time of flight</p>
        </div>
        <div class="flex gap-2 align-bottom">
          <div
            class="flex justify-center self-center border-forest-green border h-6 w-6 rounded-full hover:bg-forest-green hover:text-white cursor-pointer"
            on:click={() => calculateTravelers('-', 'children')}
          >
            <div class="text-xl text-forest-green self-center hover:text-white">
              -
            </div>
          </div>
          <span class="justify-center text-xl font-bold text-forest-green"
            >{children}</span
          >
          <div
            class="flex justify-center self-center border-forest-green border h-6 w-6 rounded-full hover:bg-forest-green cursor-pointer"
            on:click={() => calculateTravelers('+', 'children')}
          >
            <div class="text-xl text-forest-green self-center hover:text-white">
              +
            </div>
          </div>
        </div>
      </div>
      <p
        class="flex justify-end pr-2 text-lg font-bold text-forest-green cursor-pointer"
        on:click={showTravelers}
      >
        Done
      </p>
    </div>
  </div>
</div>
