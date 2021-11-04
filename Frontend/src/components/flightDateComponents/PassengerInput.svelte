<script lang="ts">
  export let adult
  export let personnumber

  let questions = [
    { id: 1, text: `Mr` },
    { id: 2, text: `Mrs` },
    { id: 3, text: `Ms` },
  ]

  let selected
  let answer
</script>

{#if adult}
  <div
    class="grid grid-rows-3 sm:grid-cols-3 sm:gap-4 sm:grid-rows-1 bg-white shadow-md p-2 mt-2 focus:ring-forest-green"
  >
    <div class="flex flex-col">
      <p class="font-bold">Title</p>
      <select
        value={selected}
        on:change={() => (answer = '')}
        class="border-2 w-full text-sm md:text-md"
      >
        {#each questions as question}
          <option value={question}>
            {question.text}
          </option>
        {/each}
      </select>
    </div>
    <div>
      <div>
        <p class="font-bold">First name</p>
      </div>
      <div class="border-b text-dim-gray mb-2 border-current">
        <input
          id="FirstName"
          type="text"
          placeholder="insert your first name"
          class="w-full h-8 focus:outline-none focus:ring focus:ring-forest-green text-sm md:text-md"
        />
      </div>
    </div>
    <div>
      <p class="font-bold ">Last name</p>
      <div class="border-b text-dim-gray mb-2 border-current">
        <input
          id="LastName"
          type="text"
          placeholder="insert your last name"
          class="w-full h-8 focus:outline-none focus:ring focus:ring-forest-green text-sm md:text-md"
        />
      </div>
    </div>
  </div>
{:else}
  <div
    class="grid grid-rows-2 sm:grid-cols-2 sm:gap-4 sm:grid-rows-1 bg-white shadow-md p-2 mt-2 focus:ring-forest-green"
  >
    <div>
      <div>
        <p class="font-bold">First name</p>
      </div>
      <div class="border-b text-dim-gray mb-2 border-current">
        <input
          id="FirstName"
          type="text"
          placeholder="insert your first name"
          class="w-full h-8 focus:outline-none focus:ring focus:ring-forest-green text-sm md:text-md"
        />
      </div>
    </div>
    <div>
      <p class="font-bold ">Last name</p>
      <div class="border-b text-dim-gray mb-2 border-current">
        <input
          id="LastName"
          type="text"
          placeholder="insert your last name"
          class="w-full h-8 focus:outline-none focus:ring focus:ring-forest-green text-sm md:text-md"
        />
      </div>
    </div>
  </div>
{/if}
