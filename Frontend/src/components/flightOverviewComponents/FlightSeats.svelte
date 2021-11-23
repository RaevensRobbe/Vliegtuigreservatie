<script lang="ts">
  import { FlightStore } from './../../stores/FlightStore'

  import { travelerStore } from './../../stores/travelerStore'
  export let retour

  let travelers: any = $travelerStore

  function calculatePrice(travelerclass: string, price: number, title: string) {
    // children pay 0.75 of the full price
    let calculatedPrice = price
    if (title === null) {
      console.log('check')
      calculatedPrice = price * 0.75
    }
    if (travelerclass === 'Business') {
      calculatedPrice = calculatedPrice * 4
    }

    calculatedPrice = Math.round(calculatedPrice * 100) / 100

    return calculatedPrice
  }
</script>

<section class="grid auto-rows-fr w-4/5 mx-auto">
  {#each travelers as traveler, index (traveler)}
    <!-- Check if traveler last item yes? dont show border bottom -->
    <div
      class="grid grid-cols-3 {index == travelers.length - 1
        ? ''
        : 'border-b-1'} text-dim-gray p-2"
    >
      <div class="flex flex-col justify-start my-auto">
        <h2 class="text-lg font-bold text-forest-green">
          {traveler.firstName}
          {traveler.lastName}
        </h2>
        <p class="text-sm self-start">
          {retour ? traveler.classDep : traveler.classRet} class
        </p>
      </div>
      <div class="flex justify-center">
        <p class="text-lg font-bold text-white bg-forest-green p-2 self-center">
          {retour ? traveler.seatNrDep : traveler.seatNrRet}
        </p>
      </div>
      <p class="flex text-xl text-cyprus-green self-center">
        € {retour
          ? calculatePrice(
              traveler.classRet,
              $FlightStore.retourPrice,
              traveler.title,
            )
          : calculatePrice(
              traveler.classDep,
              $FlightStore.departurePrice,
              traveler.title,
            )}
      </p>
    </div>
  {/each}
</section>
