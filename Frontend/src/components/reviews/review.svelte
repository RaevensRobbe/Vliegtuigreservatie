<script lang="ts">
    import { goto } from "$app/navigation";
    import Intertitle from '../../components/Intertitle.svelte'
    import { onMount } from "svelte";
    import authStore from '../../stores/authStore'
    import { get } from '../../utils/useApi'
    import StarRating from './starRating.svelte'

    export let flightId;
    let reviews: any[] = []
    let titel:string

    onMount(async () => {
      $authStore.user.getIdToken(true)
      .then((token) => {
        console.log(token)
        get(`http://localhost:3001/api/v1/flight/reviews/${flightId}` , token)
        .then((data) => {
            console.log(data)
            reviews = data.Ticket
            console.log(reviews)
            titel = `${data.Start.Name} - ${data.Destination.Name}`
        })
      })
    })

    function goBack() {
        goto('/admin/overviewPastFlights')
    }

</script>

<body class="" >
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
  <section class="sm:p-4 px-6">
    <Intertitle titleName={titel} />
    <!-- Extra info -->
  </section>

  <section>
    {#each reviews as review}
        <article class='my-6 md:my-4 py-2 px-4 bg-white shadow-md text-center hover:shadow-lg md:mx-6'>
            <div class='flex flex-row items-center justify-between mb-6'>
                <h1 class='font-bold text-lg lg:text-xl text-forest-green text-left'>{review.User.Firstname} {review.User.Lastname}</h1>
                <StarRating givenRating={review.Rating}/>
            </div>

            <div class='text-left'>
                <p class=''>{review.Review}</p>
            </div>
        </article>
    {/each}
  </section>

</body>