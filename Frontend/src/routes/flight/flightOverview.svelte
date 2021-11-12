<script lang="ts">
  import { goto } from '$app/navigation'
  import FligthDateTime from './../../components/flightOverviewComponents/FligthDateTime.svelte'
  import Intertitle from './../../components/Intertitle.svelte'

  //@ts-nocheck

  function goBack() {
    goto('/')
  }
</script>

<svelte:head>
  <title>MCT Airlines</title>
</svelte:head>

<section
  class="p-4 flex hover:cursor-pointer hover:font-bold"
  on:click={goBack}
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="h-6 w-6 my-auto"
    viewBox="0 0 20.828 37.657"
  >
    <path
      id="chevron-down"
      d="M6,9,22,25,38,9"
      transform="translate(27 -3.172) rotate(90)"
      fill="none"
      stroke="#686868"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="4"
    />
  </svg>

  <p class="">Go back</p>
</section>

<section class="p-4 px-6 align-start">
  <Intertitle titleName="Overview" />
  <div class="p-4 grid grid-rows-2 bg-white shadow-md">
    <div class="grid grid-cols-2 justify-center text-center">
      <div>
        <div class="flex justify-center ">
          <svg
            class="text-forest-green h-8 w-8 mx-2"
            id="flight_takeoff_black_24dp"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
          >
            <path
              id="Path_13"
              data-name="Path 13"
              d="M0,0H32V32H0Z"
              fill="none"
            />
            <path
              id="Path_14"
              data-name="Path 14"
              d="M2.76,26.082h26.5V29H2.76ZM30.05,12.426a2.079,2.079,0,0,0-2.566-1.547l-7.4,2.072L10.458,3.57l-2.691.744L13.54,14.775l-6.931,1.94L3.862,14.469l-2.022.569,3.612,6.551,23.106-6.463a2.234,2.234,0,0,0,1.492-2.7Z"
              transform="translate(0 0)"
              fill="#008066"
            />
          </svg>

          <p class="font-bold text-2xl text-forest-green">Brussel - Milan</p>
        </div>
        <FligthDateTime />
        <p>Seat price section</p>
      </div>
      <div>
        <p>Milan - Brussel</p>
      </div>
    </div>
    <div class="p-4">
      <p class="text-2xl text-cyprus-green font-bold">Total: €898.36</p>
    </div>
  </div>
</section>
