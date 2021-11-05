<script lang="ts">
  import { childrenStore, adultStore } from './../../stores/travelerStore'

  export let adult: boolean
  export let personnumber: number

  let titles = [`Mr`, `Mrs`, `Ms`]

  let value: string = ''

  let firstName: string = ''
  let lastName: string = ''

  function setStorage(type: string) {
    // check if adult or child
    if (adult) {
      // check if everything is filled otherwise dont add to storage
      if (value && firstName && lastName) {
        // check if adult exists in storage otherwise add to array
        if ($adultStore[personnumber]) {
          $adultStore[personnumber] = {
            title: value,
            firstName: firstName,
            lastName: lastName,
          }
        } else {
          $adultStore = [
            ...$adultStore,
            {
              title: value,
              firstName: firstName,
              lastName: lastName,
            },
          ]
        }
      }
    } else {
      // check if everything is filled otherwise dont add to storage
      if (firstName && lastName) {
        // check if adult exists in storage otherwise add to array
        if ($childrenStore[personnumber]) {
          $childrenStore[personnumber] = {
            firstName: firstName,
            lastName: lastName,
          }
        } else {
          $childrenStore = [
            ...$childrenStore,
            {
              firstName: firstName,
              lastName: lastName,
            },
          ]
        }
      }
    }
    console.log('adults')
    console.log($adultStore)
    console.log('children')
    console.log($childrenStore)
    // switch (type) {
    //   case 'FirstName':
    //     adult
    //       ? ($travelerStore.adults[personnumber].firstName = firstName)
    //       : ($travelerStore.children[personnumber].firstName = firstName)
    //     console.log(firstName)
    //     break
    //   case 'LastName':
    //     adult
    //       ? ($travelerStore.adults[personnumber].lastName = lastName)
    //       : ($travelerStore.children[personnumber].lastName = lastName)
    //     console.log(lastName)
    //     break
    //   case 'Title':
    //     console.log(value)
    //     $travelerStore.adults[personnumber].title = value
    //     break
    // }
  }
</script>

{#if adult}
  <div
    class="grid grid-rows-3 sm:grid-cols-3 sm:gap-4 sm:grid-rows-1 bg-white shadow-md p-2 mt-2 focus:ring-forest-green"
  >
    <div class="flex flex-col">
      <p class="font-bold">Title</p>
      <select
        bind:value
        on:change={() => setStorage('Title')}
        class="border-2 w-full text-sm md:text-md"
      >
        <option value="null" selected disabled class="bg-gray-100"
          >Select your title</option
        >
        {#each titles as title}
          <option value={title}>
            {title}
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
          bind:value={firstName}
          on:change={() => setStorage('FirstName')}
          id="FirstName"
          type="text"
          placeholder="insert your first name"
          class="w-full  focus:outline-none focus:ring focus:ring-forest-green text-sm md:text-md"
        />
      </div>
    </div>
    <div>
      <p class="font-bold ">Last name</p>
      <div class="border-b text-dim-gray mb-2 border-current">
        <input
          bind:value={lastName}
          on:change={() => setStorage('LastName')}
          id="LastName"
          type="text"
          placeholder="insert your last name"
          class="w-full  focus:outline-none focus:ring focus:ring-forest-green text-sm md:text-md"
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
          bind:value={firstName}
          on:change={() => setStorage('FirstName')}
          id="FirstName"
          type="text"
          placeholder="insert your first name"
          class="w-full focus:outline-none focus:ring focus:ring-forest-green text-sm md:text-md"
        />
      </div>
    </div>
    <div>
      <p class="font-bold ">Last name</p>
      <div class="border-b text-dim-gray mb-2 border-current">
        <input
          bind:value={lastName}
          on:change={() => setStorage('LastName')}
          id="LastName"
          type="text"
          placeholder="insert your last name"
          class="w-full focus:outline-none focus:ring focus:ring-forest-green text-sm md:text-md"
        />
      </div>
    </div>
  </div>
{/if}
