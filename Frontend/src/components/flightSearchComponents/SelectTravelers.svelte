<script type="ts">
  import { FlightStore } from './../../stores/flightStore'
  import { fade, scale } from 'svelte/transition'
  import { _ } from '../../utils/i18n'
  import { init } from 'svelte-i18n'
  import languageStore from '../../stores/languageStore'

  init({
    fallbackLocale: 'en',
    initialLocale: $languageStore.language,
  })

  export let toggleTravelers: boolean
  export let children: number
  export let adults: number

  function showTravelers() {
    toggleTravelers = !toggleTravelers
  }
  function calculateTravelers(operation, travler) {
    if (travler == 'children') {
      if (operation == '+') {
        $FlightStore.children++
        children++
      } else {
        if ($FlightStore.children > 0) {
          $FlightStore.children--
          children--
        }
      }
    } else {
      if (operation == '+') {
        $FlightStore.adults++
        adults++
      } else {
        if ($FlightStore.adults > 0) {
          $FlightStore.adults--
          adults--
        }
      }
    }
  }
</script>

<div class="absolute top-20 justify-center" in:scale out:fade>
  <div class="flex flex-col align-center">
    <div class="w-6 overflow-hidden inline-block self-center">
      <div class=" h-4 w-4 bg-white rotate-45 transform origin-bottom-left" />
    </div>
    <div class="bg-white rounded-xl shadow-md p-2">
      <div class="flex justify-between items-end mb-2">
        <div class="mr-4">
          <p class="text-lg font-bold text-forest-green">
            {$_('selectTravelers.adult')}
          </p>
          <p class="text-xs">{$_('selectTravelers.adulttxt')}</p>
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
          <p class="text-lg font-bold text-forest-green">
            {$_('selectTravelers.children')}
          </p>
          <p class="text-xs">{$_('selectTravelers.childrentxt')}</p>
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
            >{$FlightStore.children}</span
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
        {$_('selectTravelers.button')}
      </p>
    </div>
  </div>
</div>
