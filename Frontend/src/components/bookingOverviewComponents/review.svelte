<script>
  import StarRating from './starRating.svelte'

  let value = ''
</script>

<form class="my-4 mx-6 flex flex-col bg-white shadow-md p-4">
  <div>
    <h1 class="text-xl font-bold">Overal Rating</h1>
    <StarRating />
  </div>
  <div>
    <h1 class="text-xl font-bold">Write your review</h1>
    <textarea
      {value}
      class="w-full h-36 p-2 bg-ghost-white border-1 border-current my-4"
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
