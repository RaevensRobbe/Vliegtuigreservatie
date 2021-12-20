<script lang="ts">
  import { goto } from '$app/navigation'
  import Intertitle from '../../components/Intertitle.svelte'
  import { onMount } from 'svelte'
  import authStore from '../../stores/authStore'
  import { get } from '../../utils/useApi'
  import StarRating from './starRating.svelte'
  import { _ } from '../../utils/i18n'
  import { init } from 'svelte-i18n'
  import languageStore from '../../stores/languageStore'

  init({
    fallbackLocale: 'en',
    initialLocale: $languageStore.language,
  })

  export let flightId
  let reviews: any[] = []
  let flightName: any
  let start: string
  let end: string

  onMount(async () => {
    $authStore.user.getIdToken(true).then(token => {
      get(
        `http://localhost:3001/api/v1/flight/reviews/${flightId}`,
        token,
      ).then(data => {
        reviews = data.Ticket
        flightName = `${data.Name}`
        start = data.Start.Name
        end = data.Destination.Name
      })
    })
  })

  function goBack() {
    goto('/admin/overviewPastFlights')
  }
</script>

<body class="">
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
    <p class="">{$_('reviews.gobackBtn')}</p>
  </section>
  <section class="sm:m-4 px-6">
    <Intertitle titleName="{$_('reviews.flight')}{flightName}" />
  </section>

  <section class="flex flex-row align-center justify-center">
    <h1
      class="mr-4 text-md md:text-2xl font-bold text-center text-forest-green"
    >
      {start}
    </h1>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="fill-current dim-gray h-3 md:h-4 my-auto"
      viewBox="0 0 44 22.458"
    >
      <g
        id="Flight_icon"
        data-name="Flight icon"
        transform="translate(-829 -1009.771)"
      >
        <path
          id="bxs-plane-take-off"
          d="M46.813,14.674a3.616,3.616,0,0,0-4.572-2.288L32.195,15.737,14.229,9,9.737,11.246l13.475,8.983L14.229,24.72,5.246,20.229,3,22.475l8.983,8.983,32.67-12.251a3.619,3.619,0,0,0,2.16-4.532Z"
          transform="translate(826 1000.771)"
        />
      </g>
    </svg>
    <h1 class="ml-4 text-md md:text-2xl font-bold text-forest-green">{end}</h1>
  </section>

  <section class="m-4 px-6">
    {#each reviews as review}
      {#if review && review.Review !== ''}
        <article
          class="my-6 md:my-4 py-2 px-4 bg-white shadow-md text-center hover:shadow-lg md:mx-6"
        >
          <div class="flex flex-row items-center justify-between mb-6">
            <h1
              class="font-bold text-lg lg:text-xl text-forest-green text-left"
            >
              {review.User.Firstname}
              {review.User.Lastname}
            </h1>
            <StarRating givenRating={review.Rating} />
          </div>

          <div class="text-left flex">
            <p class="flex">{review.Review}</p>
          </div>
        </article>
      {:else}
        <div class="flex justify-center m-8">
          <h1 class="text-lg font-bold text-forest-green">No Reviews found</h1>
        </div>
      {/if}
    {/each}
  </section>
</body>
