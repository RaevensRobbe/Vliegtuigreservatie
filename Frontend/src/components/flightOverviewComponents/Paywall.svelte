<script lang="ts">
  import {
    cardLength,
    cvcLength,
    requiredValidator,
  } from '../../utils/inputValidator'
  import paywallCompStore from '../../stores/paywallCompStore'
  import { goto } from '$app/navigation'
  let number
  let name = ''
  let cvc = ''
  let expiry = ''
  let prevLength = 0

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

  //Submit post data to database

  //Go to ticket page
  goto('/flight/flightTicket')
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
          class="w-full focus:outline-none focus:ring focus:ring-forest-green text-sm md:text-md"
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
          class="w-full focus:outline-none focus:ring focus:ring-forest-green text-sm md:text-md"
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
              class="w-full focus:outline-none focus:ring focus:ring-forest-green text-sm md:text-md"
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
              class="w-full focus:outline-none focus:ring focus:ring-forest-green text-sm md:text-md"
            />
          </div>
          {#if errors.cvc}
            <p class="text-red-600 -mt-2 mb-2">{errors.cvc}</p>
          {/if}
        </div>
      </div>

      <button
        type="submit"
        class="bg-forest-green rounded-full p-2 mt-4 font-bold text-xl md:text-2xl text-white"
      >
        Confirm payment
      </button>
    </form>
  </div>
</div>
