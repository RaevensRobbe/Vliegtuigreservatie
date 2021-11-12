<script lang="ts">
  import FlightSeats from './FlightSeats.svelte'
  import FlightDateTime from './FlightDateTime.svelte'
</script>

<div>
  <div class="flex justify-center ">
    <svg
      class="text-forest-green h-8 w-8 mx-2"
      id="flight_takeoff_black_24dp"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
    >
      <path id="Path_13" data-name="Path 13" d="M0,0H32V32H0Z" fill="none" />
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
  <FlightDateTime />
  <FlightSeats />
</div>
