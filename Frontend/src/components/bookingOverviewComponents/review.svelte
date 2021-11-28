<script lang="ts">
  import StarRating from './starRating.svelte'
  import { put } from '../../utils/useApi'
  export let flight
  console.log(flight)
  let rating: number = 0
  let reviewText: string = ''
  function handleSubmit() {
    console.log(rating)
    console.log(reviewText)
    if (reviewText) {
      console.log('ga door')
      addToDB()
    } else {
      console.log('add text')
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
    console.log(call)
  }
</script>

<form
  class="my-4 mx-6 flex flex-col bg-white shadow-md p-4"
  on:submit|preventDefault={handleSubmit}
>
  <div>
    <h1 class="text-xl font-bold">Overal Rating</h1>
    <StarRating bind:ratingScore={rating} />
  </div>
  <div>
    <h1 class="text-xl font-bold">Write your review</h1>
    <textarea
      bind:value={reviewText}
      class="w-full h-36 p-2 bg-ghost-white border-1 border-current my-4"
      required
    />
  </div>
  <div class="flex justify-end">
    <button
      type="submit"
      class="flex p-4 justify-center items-center font-bold text-lg text-white bg-forest-green rounded-xl hover:bg-cyprus-green"
    >
      Submit review
    </button>
  </div>
</form>
