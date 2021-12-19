<script lang="ts">
  import StarRating from './starRating.svelte'
  import { put } from '../../utils/useApi'

  import { _ } from '../../utils/i18n'
  import { init } from 'svelte-i18n'
  import languageStore from '../../stores/languageStore'
  
  init({
      fallbackLocale: 'en',
      initialLocale: $languageStore.language,
    })

  export let flight
  export let givenRating: number
  export let givenReview: string

  let rating: number = 0
  let reviewText: string = ''

  if (givenRating) {
    rating = givenRating
  }

  function handleSubmit() {
    if (reviewText) {
      addToDB()
    }
  }

  async function addToDB() {
    let data = {
      Rating: rating,
      Review: reviewText,
    }
    let call: any = await put(
      `http://localhost:3001/api/v1/ticket/review/${flight}`,
      data,
    )
    givenReview = reviewText
  }
</script>

<form
  class="my-4 mx-6 flex flex-col bg-white shadow-md p-4"
  on:submit|preventDefault={handleSubmit}
>
  <div>
    <h1 class="text-xl font-bold"> {$_('addReview.intertitle1')} </h1>
    <StarRating bind:ratingScore={rating} {givenRating} />
  </div>
  <div>
    <h1 class="text-xl font-bold"> {$_('addReview.intertitle2')} </h1>
    {#if givenReview}
      <textarea
        bind:value={givenReview}
        class="w-full h-36 p-2 bg-ghost-white border-1 border-current my-4"
        readonly
      />
    {:else}
      <textarea
        bind:value={reviewText}
        class="w-full h-36 p-2 bg-ghost-white border-1 border-current my-4"
        required
      />
    {/if}
  </div>
  {#if !givenReview}
    <div class="flex justify-end">
      <button
        type="submit"
        class="flex p-4 justify-center items-center font-bold text-lg text-white bg-forest-green rounded-xl hover:bg-cyprus-green"
      >
        {$_('addReview.button')}
      </button>
    </div>
  {/if}
</form>
