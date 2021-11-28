<script>
  let ratings = ['1', '2', '3', '4', '5']
</script>

<div class="flex">
  {#each ratings as rating}
    <label for={rating}>
      <input type="radio" name="rating" id={rating} class="peer hidden" />
      <svg
        class="h-8 mx-1 fill-current opacity-50 hover:text-yellow-300 peer-checked:opacity-100 peer-checked:text-yellow-300"
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
  {/each}
</div>
