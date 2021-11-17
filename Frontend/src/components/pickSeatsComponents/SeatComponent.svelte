<script lang="ts">
  import { onMount } from 'svelte'

  export let row: number
  export let column: string
  export let status: string

  let style: string

  onMount(() => {
    if (status === 'free') {
      style = 'bg-white border border-forest-green'
    } else if (status === 'taken') {
      style = 'bg-gray-300'
    }
  })

  let clicked = false

  const setStyle = () => {
    console.log(`selected [${row},${column}]`)
    if (status === 'taken') {
      return
    }

    clicked = !clicked

    if (clicked == false) {
      style = 'bg-white border border-forest-green'
    } else {
      style = 'bg-forest-green'
    }
  }
</script>

<div class="w-12 h-12 {style}" on:click={setStyle}>
  {#if status === 'taken'}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="w-12 h-12 "
      viewBox="0 0 24 24"
      stroke="#ffffff"
      stroke-width="1"
      stroke-linecap="round"
      stroke-linejoin="round"
      ><line x1="18" y1="6" x2="6" y2="18" /><line
        x1="6"
        y1="6"
        x2="18"
        y2="18"
      /></svg
    >
  {/if}
  {#if clicked}
    <h1
      class="w-full flex h-full items-center justify-center text-white font-bold text-center text-xl"
    >
      {row}
      {column}
    </h1>
  {/if}
</div>
