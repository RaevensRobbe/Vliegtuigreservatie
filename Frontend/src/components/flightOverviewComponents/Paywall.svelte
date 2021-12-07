<script lang="ts">
  import {
    cardLength,
    cvcLength,
    requiredValidator,
  } from '../../utils/inputValidator'
  import paywallCompStore from '../../stores/paywallCompStore'
  import authStore from '../../stores/authStore'
  import { travelerStore } from '../../stores/travelerStore'
  import { FlightStore } from '../../stores/FlightStore'
  import { goto } from '$app/navigation'
  import { post } from '../../utils/useApi'
  let number
  let name = ''
  let cvc = ''
  let expiry = ''
  let prevLength = 0
  let retourCheck: boolean = false
  let departureCheck: boolean = false
  let errors: any = {}

  function onSubmit() {
    if (
      requiredValidator(number) &&
      requiredValidator(name) &&
      requiredValidator(expiry) &&
      requiredValidator(cvc)
    ) {
      errors.number = 'Cardnumber is required'
      errors.name = 'Name is required'
      errors.cvc = 'cvc is required'
      errors.expiry = 'Expire date is required'
      return
    }

    if (requiredValidator(number)) {
      errors.number = 'Cardnumber is required'
      return
    } else {
      if (cardLength(number)) {
        errors.number = ''
      } else {
        errors.number = 'Invalid card number'
        return
      }
    }

    if (requiredValidator(name)) {
      errors.name = 'Name is required'
      return
    } else {
      errors.name = ''
    }

    if (requiredValidator(expiry)) {
      errors.expiry = 'Expire date is required'
      return
    } else {
      errors.expiry = ''
    }

    if (requiredValidator(cvc)) {
      errors.cvc = 'cvc is required'
      return
    } else {
      if (cvcLength(cvc)) {
        errors.cvc = ''
      } else {
        errors.cvc = 'Invalid cvc'
        return
      }
    }

    //departure seats
    let seatDataArrayDeparture = []
    $travelerStore.forEach(traveler => {
      seatDataArrayDeparture.push({
        class: traveler.classDep,
        column: traveler.seatNrDep.charAt(0),
        row: traveler.seatNrDep.charAt(1),
      })
    })

    //retour seats
    let seatDataArrayRetour = []
    if ($FlightStore.retourFlight) {
      $travelerStore.forEach(traveler => {
        seatDataArrayRetour.push({
          class: traveler.classRet,
          column: traveler.seatNrRet.charAt(0),
          row: traveler.seatNrRet.charAt(1),
        })
      })
    }

    //passengers
    let travelerArray = []
    $travelerStore.forEach(traveler => {
      travelerArray.push(`${traveler.firstName} ${traveler.lastName}`)
    })

    //Submit post data to database
    let dataDeparture = {
      seatData: seatDataArrayDeparture,
      return: false,
      persons: travelerArray,
      userId: $authStore.user.uid,
      flightId: $FlightStore.departureFlight,
    }

    let dataRetour
    if ($FlightStore.retourFlight) {
      dataRetour = {
        seatData: seatDataArrayRetour,
        return: true,
        persons: travelerArray,
        userId: $authStore.user.uid,
        flightId: $FlightStore.retourFlight,
      }
    }

    addToDB(dataDeparture, false)
    addToDB(dataRetour, true)

    async function addToDB(data: any, retour: boolean) {
      let call: any = await post(
        'http://localhost:3001/api/v1/ticket/createTicket',
        data,
      )
      // console.log(call.success)
      // if (retour) {
      //   if (call.succes) {
      //     retourCheck = true
      //     console.log('go to next page')
      //     goToNextPage()
      //   }
      // } else {
      //   if (call.succes) {
      //     departureCheck = true
      //     console.log('go to next page')
      //     goToNextPage()
      //   }
      // }
    }

    // async function goToNextPage() {
    //   console.log(`retour ${$FlightStore.retourFlight}`)
    //   console.log(`departure check ${departureCheck}`)
    //   console.log(`retour check ${retourCheck}`)

    //   if ($FlightStore.retourFlight) {
    //     console.log(`retour ${$FlightStore.retourFlight}`)
    //     if (departureCheck && retourCheck) {
    //       //Go to ticket page
    //       goto('/flight/flightTicket')
    //     }
    //   }
    //   if (!$FlightStore.retourFlight) {
    //     if (departureCheck) {
    //       //Go to ticket page
    //       goto('/flight/flightTicket')
    //     }
    //   }
    // }
    goto('/flight/flightTicket')
  }

  function showPaywall() {
    let paywallToggle = $paywallCompStore.showPaywall
    paywallToggle = !paywallToggle
    paywallCompStore.set({
      showPaywall: paywallToggle,
    })
  }
  function checkCardNumber() {
    let lengthccn = number.length

    if (prevLength <= lengthccn) {
      if (lengthccn === 4 || lengthccn === 9 || lengthccn === 14) {
        number += ' '
      } else {
        let last = number.substr(number.length - 1)
        if (/^\d+$/.test(last) == false) {
          //not a number so delete last item
          number = number.slice(0, -1)
        }
      }
    }
    prevLength = lengthccn
  }
  function checkExpiry() {
    console.log('Checking')
    let lengthExpiry = expiry.length

    if (prevLength <= lengthExpiry) {
      if (lengthExpiry === 2) {
        expiry += '/'
      } else {
        let last = expiry.substr(expiry.length - 1)
        if (/^\d+$/.test(last) == false) {
          //not a number so delete last item
          expiry = expiry.slice(0, -1)
        }
      }
    }
    prevLength = lengthExpiry
  }
</script>

<div class="absolute top-0 left-0 h-full z-10 w-full">
  <div
    class="flex justify-center items-center w-screen h-screen bg-black bg-opacity-70 fixed"
  >
    <form
      on:submit|preventDefault={onSubmit}
      class="w-4/5 sm:w-3/5 md:w-3/5 lg:w-2/5 xl:w-2/5 2xl:w-2/5 3xl:w-1/5 z-10 bg-white p-8 flex flex-col"
    >
      <div class="flex justify-between mb-4">
        <h1 class=" text-xl md:text-2xl text-forest-green">
          Complete transaction
        </h1>
        <svg
          on:click={showPaywall}
          xmlns="http://www.w3.org/2000/svg"
          class="w-6 h-6 fill-current text-forest-green cursor-pointer"
          viewBox="0 0 32 32"
        >
          <path
            id="Icon_material-close"
            data-name="Icon material-close"
            d="M39.5,10.723,36.277,7.5,23.5,20.277,10.723,7.5,7.5,10.723,20.277,23.5,7.5,36.277,10.723,39.5,23.5,26.723,36.277,39.5,39.5,36.277,26.723,23.5Z"
            transform="translate(-7.5 -7.5)"
          />
        </svg>
      </div>
      <img
        src="/FreePlasticCreditDebitCardMockup.png"
        class=" w-3/4 mx-auto my-4"
        alt="Debit credit card"
      />
      <label for="ccn" class="font-bold">Card number</label>
      <div class="border-b text-dim-gray mb-2 border-current">
        <input
          bind:value={number}
          on:input={checkCardNumber}
          id="ccn"
          inputmode="numeric"
          type="tel"
          maxlength="19"
          placeholder="xxxx xxxx xxxx xxxx"
          class="w-full py-1 focus:outline-none focus:ring focus:ring-forest-green text-sm md:text-md"
        />
      </div>
      {#if errors.number}
        <p class="text-red-600 -mt-2 mb-2">{errors.number}</p>
      {/if}

      <label for="name" class="font-bold">Cardholder Name</label>
      <div class="border-b text-dim-gray mb-2 border-current">
        <input
          bind:value={name}
          id="name"
          placeholder="ex: John Smith"
          class="w-full py-1 focus:outline-none focus:ring focus:ring-forest-green text-sm md:text-md"
        />
      </div>
      {#if errors.name}
        <p class="text-red-600 -mt-2 mb-2">{errors.name}</p>
      {/if}
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label for="expiry" class="font-bold">Expiry date</label>
          <div class="border-b text-dim-gray mb-2 border-current">
            <input
              bind:value={expiry}
              on:input={checkExpiry}
              type="text"
              id="expiry"
              placeholder="MM/YY"
              maxlength="5"
              class="w-full py-1 focus:outline-none focus:ring focus:ring-forest-green text-sm md:text-md"
            />
          </div>
          {#if errors.expiry}
            <p class="text-red-600 -mt-2 mb-2">{errors.expiry}</p>
          {/if}
        </div>
        <div>
          <label for="securityCode" class="font-bold">Security code</label>
          <div class="border-b text-dim-gray mb-2 border-current">
            <input
              bind:value={cvc}
              maxlength="3"
              type="password"
              id="securityCode"
              placeholder="CVC"
              class="w-full py-1 focus:outline-none focus:ring focus:ring-forest-green text-sm md:text-md"
            />
          </div>
          {#if errors.cvc}
            <p class="text-red-600 -mt-2 mb-2">{errors.cvc}</p>
          {/if}
        </div>
      </div>

      <button
        type="submit"
        class="flex p-4 justify-center items-center font-bold text-2xl text-white bg-forest-green rounded-xl hover:bg-cyprus-green"
      >
        Confirm payment
      </button>
      {#if errors.transaction}
        <p class="text-red-600 -mt-2 mb-2">{errors.transaction}</p>
      {/if}
    </form>
  </div>
</div>
