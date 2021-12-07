<script lang="ts">
  export let givenRating: number
  export let ratingScore: number

  let hoverRating = 0

  function setRating(rating) {
    ratingScore = rating
    for (let i = 0; i < 5; i++) {
      if (i <= ratingScore - 1) {
        ratingColors[i] = 'text-yellow-300'
        ratingOpacity[i] = 'opacity-100'
      } else {
        ratingColors[i] = 'text-dim-gray'
        ratingOpacity[i] = 'opacity-50'
      }
    }
  }

  function setHoverRating(rating) {
    hoverRating = rating
    for (let i = 0; i < 5; i++) {
      if (i <= hoverRating - 1) {
        hoverColors[i] = 'text-yellow-300'
        hoverOpacity[i] = 'opacity-100'
      } else {
        hoverColors[i] = 'text-dim-gray'
        hoverOpacity[i] = 'opacity-50'
      }
    }
  }

  let ratings = [1, 2, 3, 4, 5]
  let ratingColors = [
    'text-dim-gray',
    'text-dim-gray',
    'text-dim-gray',
    'text-dim-gray',
    'text-dim-gray',
  ]
  let ratingOpacity = [
    'opacity-50',
    'opacity-50',
    'opacity-50',
    'opacity-50',
    'opacity-50',
  ]
  let hoverColors = [
    'text-dim-gray',
    'text-dim-gray',
    'text-dim-gray',
    'text-dim-gray',
    'text-dim-gray',
  ]
  let hoverOpacity = [
    'opacity-50',
    'opacity-50',
    'opacity-50',
    'opacity-50',
    'opacity-50',
  ]

  if (givenRating) {
    setRating(givenRating)
  }
</script>

<div class="flex">
  {#each ratings as rating}
    <div
      on:click={() => setRating(rating)}
      on:mouseover={() => {
        setHoverRating(rating)
      }}
      on:focus={() => {
        setHoverRating(rating)
      }}
      on:mouseout={() => {
        setHoverRating(0)
      }}
      on:blur={() => {
        setHoverRating(0)
      }}
    >
      <label for={rating.toString()}>
        <input
          type="radio"
          name="rating"
          id={rating.toString()}
          class="peer hidden"
        />
        <svg
          class="h-8 mx-1 fill-current 
          {hoverRating > ratingScore
            ? hoverColors[rating - 1]
            : ratingColors[rating - 1]}
          {hoverRating > ratingScore
            ? hoverOpacity[rating - 1]
            : ratingOpacity[rating - 1]}
          peer-checked:opacity-100 peer-checked:text-yellow-300 hover:text-yellow-300 hover:opacity-50 cursor-pointer"
          xmlns="http://www.w3.org/2000/svg"
          width="36.001"
          height="34.334"
          viewBox="0 0 36.001 34.334"
        >
          <path
            id="star"
            d="M36,13.305a1.563,1.563,0,0,1-.563,1.038L27.584,22l1.861,10.817a3.214,3.214,0,0,1,.022.433,1.276,1.276,0,0,1-.227.768.765.765,0,0,1-.661.314,1.747,1.747,0,0,1-.865-.26L18,28.968,8.286,34.074a1.836,1.836,0,0,1-.865.26.785.785,0,0,1-.681-.314,1.281,1.281,0,0,1-.228-.768,3.537,3.537,0,0,1,.043-.433L8.416,22,.541,14.344A1.648,1.648,0,0,1,0,13.305q0-.8,1.212-.995l10.861-1.579L16.94.887Q17.351,0,18,0t1.06.887l4.868,9.844L34.789,12.31Q36,12.5,36,13.3Z"
          />
        </svg>
      </label>
    </div>
  {/each}
</div>
