<script lang="ts">
  import { goto } from '$app/navigation'
  import FlightOverviewItem from './../../components/flightOverviewComponents/FlightOverviewItem.svelte'
  import Intertitle from './../../components/Intertitle.svelte'
  import { FlightStore } from './../../stores/FlightStore'
  import loginCompStore from '../../stores/loginCompStore'
  import paywallCompStore from '../../stores/paywallCompStore'
  import { travelerStore } from './../../stores/travelerStore'
  import authStore from '../../stores/authStore'
  import Paywall from '../..//components/flightOverviewComponents/Paywall.svelte'

  //@ts-nocheck
  const retour: boolean = true

  let travelers: any = $travelerStore

  function calculatePrice() {
    console.log($FlightStore)
    // children pay 0.75 of the full price
    let retourPrice: number
    let totalRetourPrice: number = 0
    if (retour) {
      retourPrice = $FlightStore.retourPrice
      travelers.forEach(traveler => {
        let passengerPrice = 0
        if (traveler.title === null) {
          passengerPrice += retourPrice * 0.75
        } else {
          passengerPrice = retourPrice
        }
        if (traveler.classRet === 'Business') {
          passengerPrice = passengerPrice * 4
        }
        console.log(totalRetourPrice)
        totalRetourPrice += passengerPrice
      })
    }

    let departurePrice: number = $FlightStore.departurePrice
    let totalDeparturePrice: number = 0
    travelers.forEach(traveler => {
      let passengerPrice = 0
      if (traveler.title === null) {
        passengerPrice += departurePrice * 0.75
      } else {
        passengerPrice = departurePrice
      }
      if (traveler.classDep === 'Business') {
        passengerPrice = passengerPrice * 4
      }
      totalDeparturePrice += passengerPrice
    })

    console.log(totalRetourPrice + ' + ' + totalDeparturePrice)

    let totalprice: number =
      Math.round((totalRetourPrice + totalDeparturePrice) * 100) / 100

    return totalprice
  }

  function goBack() {
    goto('/flight/pickSeats')
  }

  function handleSubmit() {
    if ($authStore.user !== null) {
      let paywallToggle = $paywallCompStore.showPaywall
      paywallToggle = !paywallToggle
      paywallCompStore.set({
        showPaywall: paywallToggle,
      })
      // goto('/flight/flightTicket')
    } else {
      //SHOW LOGIN FORM
      let loginToggle = $loginCompStore.showLogin
      loginToggle = !loginToggle
      loginCompStore.set({
        showRegister: false,
        showLogin: loginToggle,
      })
    }
  }
</script>

<svelte:head>
  <title>MCT Airlines</title>
</svelte:head>

<section
  class="p-4 flex hover:cursor-pointer hover:font-bold"
  on:click={goBack}
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="h-6 w-6 my-auto"
    viewBox="0 0 20.828 37.657"
  >
    <path
      id="chevron-down"
      d="M6,9,22,25,38,9"
      transform="translate(27 -3.172) rotate(90)"
      fill="none"
      stroke="#686868"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="4"
    />
  </svg>

  <p class="">Go back</p>
</section>

<section class="p-4 px-6 align-start">
  <Intertitle titleName="Overview" />
  <div class="flex flex-col bg-white shadow-md mx-6">
    <div class="grid {retour ? 'lg:grid-cols-2' : 'lg:grid-cols-1'} ">
      <FlightOverviewItem retour={false} />
      {#if retour}
        <FlightOverviewItem retour={true} />
      {/if}
    </div>
    <div class="border-t-1">
      <p class="m-4 text-2xl text-cyprus-green font-bold">
        Total: €{calculatePrice()}
      </p>
    </div>
  </div>
</section>

<section class="flex justify-center my-4">
  <button
    type="submit"
    class="flex p-4 justify-center items-center font-bold text-2xl text-white bg-forest-green rounded-xl hover:bg-cyprus-green"
    on:click={handleSubmit}
  >
    Go to payment
  </button>
</section>

{#if $paywallCompStore.showPaywall}
  <Paywall />
{/if}
