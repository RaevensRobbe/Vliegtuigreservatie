<script lang="ts">
  import { travelerStore } from './../../stores/travelerStore'

  export let adult: boolean
  export let personnumber: number
  //object errors add errors in here otherwise delete them
  let errors: any = {}

  let titles: Array<string> = [`Mr`, `Mrs`, `Ms`]

  let value: string = ''

  let firstName: string = ''
  let lastName: string = ''

  function setStorage(type: string) {
    // check if adult or child
    if (adult) {
      // check if everything is filled otherwise dont add to storage
      if (value && firstName && lastName) {
        // check if adult exists in storage otherwise add to array
        if ($travelerStore[personnumber]) {
          $travelerStore[personnumber] = {
            title: value,
            firstName: firstName,
            lastName: lastName,
            seatNrDep: '',
            seatNrRet: '',
          }
        } else {
          $travelerStore = [
            ...$travelerStore,
            {
              title: value,
              firstName: firstName,
              lastName: lastName,
              seatNrDep: '',
              seatNrRet: '',
            },
          ]
        }
      }
    } else {
      // check if everything is filled otherwise dont add to storage
      if (firstName && lastName) {
        // check if adult exists in storage otherwise add to array
        if ($travelerStore[personnumber]) {
          $travelerStore[personnumber] = {
            title: null,
            firstName: firstName,
            lastName: lastName,
            seatNrDep: '',
            seatNrRet: '',
          }
        } else {
          $travelerStore = [
            ...$travelerStore,
            {
              title: null,
              firstName: firstName,
              lastName: lastName,
              seatNrDep: '',
              seatNrRet: '',
            },
          ]
        }
      }
    }
  }
</script>

{#if adult}
  <div
    class="grid grid-rows-3 md:mx-6 sm:grid-cols-3 sm:gap-4 sm:grid-rows-1 bg-white shadow-md p-2 mt-2 focus:ring-forest-green"
  >
    <div class="flex flex-col">
      <label for="title{personnumber}" class="font-bold">Title</label>
      <select
        id="title{personnumber}"
        bind:value
        on:change={() => setStorage('Title')}
        class="border-2 w-full text-sm md:text-md"
        required
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
        <label for="FirstName{personnumber}" class="font-bold">First name</label
        >
      </div>
      <div class="border-b text-dim-gray mb-2 border-current">
        <input
          bind:value={firstName}
          on:change={() => setStorage('FirstName')}
          id="FirstName{personnumber}"
          type="text"
          placeholder="insert your first name"
          class="w-full py-1 focus:outline-none focus:ring focus:ring-forest-green text-sm md:text-md"
          required
        />
      </div>
    </div>
    <div>
      <label class="font-bold " for="LastName{personnumber}">Last name</label>
      <div class="border-b text-dim-gray mb-2 border-current">
        <input
          bind:value={lastName}
          on:change={() => setStorage('LastName')}
          id="LastName{personnumber}"
          type="text"
          placeholder="insert your last name"
          class="w-full py-1 focus:outline-none focus:ring focus:ring-forest-green text-sm md:text-md"
          required
        />
      </div>
    </div>
  </div>
{:else}
  <div
    class="grid grid-rows-2 md:mx-6 sm:grid-cols-2 sm:gap-4 sm:grid-rows-1 bg-white shadow-md p-2 mt-2 focus:ring-forest-green"
  >
    <div>
      <div>
        <label class="font-bold" for="FirstName{personnumber}">First name</label
        >
      </div>
      <div class="border-b text-dim-gray mb-2 border-current">
        <input
          bind:value={firstName}
          on:change={() => setStorage('FirstName')}
          id="FirstName{personnumber}"
          type="text"
          placeholder="insert your first name"
          class="w-full py-1 focus:outline-none focus:ring focus:ring-forest-green text-sm md:text-md"
        />
      </div>
    </div>
    <div>
      <label class="font-bold " for="LastName{personnumber}">Last name</label>
      <div class="border-b text-dim-gray mb-2 border-current">
        <input
          bind:value={lastName}
          on:change={() => setStorage('LastName')}
          id="LastName{personnumber}"
          type="text"
          placeholder="insert your last name"
          class="w-full py-1 focus:outline-none focus:ring focus:ring-forest-green text-sm md:text-md"
        />
      </div>
    </div>
  </div>
{/if}
