<script lang="ts">
  import paywallCompStore from '../../stores/paywallCompStore'
  let cardNumber
  let securitycode
  let cardHolder
  let src = 'image/FreePlasticCreditDebitCardMockup.png'

  let errors: any = {}

  function onSubmit() {}

  function showPaywall() {
    let paywallToggle = $paywallCompStore.showPaywall
    paywallToggle = !paywallToggle
    paywallCompStore.set({
      showPaywall: paywallToggle,
    })
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
        <h1 class=" text-2xl text-forest-green">Complete transaction</h1>
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
        src="/images/FreePlasticCreditDebitCardMockup.png"
        alt="Debit credit card"
      />
      <label for="ccn" class="font-bold">Card number</label>
      <div class="border-b text-dim-gray mb-2 border-current">
        <input
          bind:value={cardNumber}
          id="ccn"
          inputmode="numeric"
          pattern="[0-9\s]"
          autocomplete="cc-number"
          maxlength="19"
          placeholder="xxxx xxxx xxxx xxxx"
          class="w-full focus:outline-none focus:ring focus:ring-forest-green text-sm md:text-md"
        />
      </div>
      {#if errors.email}
        <p class="text-red-600 -mt-2 mb-2">{errors.email}</p>
      {/if}

      <label for="cardHolder" class="font-bold">Cardholder Name</label>
      <div class="border-b text-dim-gray mb-2 border-current">
        <input
          bind:value={cardHolder}
          id="cardHolder"
          placeholder="ex: John Doe"
          class="w-full focus:outline-none focus:ring focus:ring-forest-green text-sm md:text-md"
        />
      </div>
      {#if errors.email}
        <p class="text-red-600 -mt-2 mb-2">{errors.email}</p>
      {/if}
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label for="expire" class="font-bold">Expiry date</label>
          <div class="border-b text-dim-gray mb-2 border-current">
            <input
              bind:value={securitycode}
              type="text"
              id="expire"
              placeholder="ex: 12/12"
              class="w-full focus:outline-none focus:ring focus:ring-forest-green text-sm md:text-md"
            />
          </div>
          {#if errors.pw}
            <p class="text-red-600 -mt-2 mb-2">{errors.pw}</p>
          {/if}
        </div>
        <div>
          <label for="securityCode" class="font-bold">Security code</label>
          <div class="border-b text-dim-gray mb-2 border-current">
            <input
              bind:value={securitycode}
              type="password"
              id="securityCode"
              placeholder="xxx"
              class="w-full focus:outline-none focus:ring focus:ring-forest-green text-sm md:text-md"
            />
          </div>
          {#if errors.pw}
            <p class="text-red-600 -mt-2 mb-2">{errors.pw}</p>
          {/if}
        </div>
      </div>

      <button
        type="submit"
        class="bg-forest-green rounded-full p-2 mt-4 font-bold text-2xl text-white"
      >
        Confirm payment
      </button>
    </form>
  </div>
</div>
