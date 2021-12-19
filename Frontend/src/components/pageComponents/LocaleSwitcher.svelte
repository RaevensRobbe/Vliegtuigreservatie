<script>
  import { createEventDispatcher } from 'svelte'
  export let value = 'en'
  const dispatch = createEventDispatcher()
  function switchLocale(event) {
    event.preventDefault()
    dispatch('locale-changed', event.target.value)
    console.log(event.target.value)
  }
</script>

<div class="flex justify-center">
  <div class="m-1 text-center">
    <select {value} on:change={switchLocale} class="rounded-sm">
      <option value="en">English</option>
      <option value="nl">Dutch</option>
    </select>
  </div>
</div>
