<script lang="ts">
  import { emailValidator, requiredValidator } from '../../utils/inputValidator'
  import Intertitle from '../../components/Intertitle.svelte'
  import { onMount } from 'svelte'
  import { get, post } from '../../utils/useApi'
  import authStore from '../../stores/authStore'
  import { updateCurrentUser, updateEmail, updateProfile } from '@firebase/auth'
  import { getAuth } from 'firebase/auth'
  import { put } from '../../utils/useApi'
  import Spinner from '../../components/animations/spinner.svelte'
  import { goto } from '$app/navigation'
  import { fade, scale } from 'svelte/transition'

  const auth = getAuth()
  const user = auth.currentUser

  let errors: any = {}
  let succes: boolean = false
  let userdata: any = {}
  let loading: boolean = false

  onMount(async () => {
    console.log($authStore.user.uid)
    const getData = await get(
      `http://localhost:3001/api/v1/user/data/${$authStore.user.uid}`,
    )
    userdata = getData
    //console.log(userdata)
  })

  async function updateUser(data) {
    const res = await put(
      `http://localhost:3001/api/v1/user/updateUser/${$authStore.user.uid}`,
      data,
    )
    loading = false
    if (res.success) {
      //ROBBE FIX LOADING DINGKIE
      succes = true
      console.log('yeey')
    } else {
      errors.update = 'Please try again something went wrong'
      console.log('NEEY')
    }
  }

  const changeUserData = () => {
    const displayName = `${userdata.Firstname} ${userdata.Lastname}`
    console.log(userdata.Picture)
    updateProfile(user, {
      displayName: displayName,
      photoURL: userdata.Picture,
    })
      .then(() => {
        updateEmail(user, userdata.Email)
          .then(() => {
            $authStore.user = user
            console.log(user.photoURL)
            const data: { firstname: string; lastname: string; email: string } =
              {
                firstname: userdata.Firstname,
                lastname: userdata.Lastname,
                email: userdata.Email,
              }
            updateUser(data)
          })
          .catch(error => {
            console.error(error)
            errors.update = 'Please try again something went wrong'
            loading = false
          })
      })
      .catch(error => {
        console.error(error)
        errors.update = 'Please try again something went wrong'
        loading = false
      })
  }

  const onSubmit = () => {
    if (
      requiredValidator(userdata.Email) &&
      requiredValidator(userdata.Firstname) &&
      requiredValidator(userdata.Lastname)
    ) {
      errors.firstname = 'Firstname is required'
      errors.lastname = 'Lastname is required'
      errors.email = 'Email is required'
      return
    }

    if (requiredValidator(userdata.Firstname)) {
      errors.firstname = 'Firstname is required'
      return
    } else errors.firstname = ''

    if (requiredValidator(userdata.Lastname)) {
      errors.lastname = 'Lastname is required'
      return
    } else errors.lastname = ''

    if (requiredValidator(userdata.Email)) {
      errors.email = 'Email is required'
      return
    } else {
      if (!emailValidator(userdata.Email)) {
        errors.email = 'Invalid email'
        return
      } else errors.email = ''
    }

    loading = true

    changeUserData()
  }

  function goBack() {
    goto('/')
  }
</script>

<section class="p-4 md:px-6 align-start">
  <section
    class="my-4 flex hover:cursor-pointer hover:font-bold"
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

  <Intertitle titleName="Edit account details" />

  <section class="flex justify-center self-center">
    {#if succes === false}
      <form
        on:submit|preventDefault={onSubmit}
        class="w-4/5 sm:w-3/5 md:w-4/5 lg:w-3/5 bg-white p-8 flex flex-col shadow-md"
      >
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="flex flex-col">
            <label for="firstname" class="mb-2 font-bold"> First name </label>
            <div class="border-b text-dim-gray mb-2 border-current">
              <input
                bind:value={userdata.Firstname}
                id="firstname"
                type="text"
                class=" w-full py-1 focus:outline-none focus:ring focus:ring-forest-green text-sm md:text-md"
              />
            </div>

            {#if errors.firstname}
              <p class="text-red-600 -mt-2 mb-2">{errors.firstname}</p>
            {/if}
          </div>

          <div class="flex flex-col">
            <label for="lastname" class="mb-2 font-bold"> Last name </label>
            <div class="border-b text-dim-gray mb-2 border-current">
              <input
                bind:value={userdata.Lastname}
                id="lastname"
                type="text"
                class=" w-full py-1 focus:outline-none focus:ring focus:ring-forest-green text-sm md:text-md"
              />
            </div>
            {#if errors.lastname}
              <p class="text-red-600 -mt-2 mb-2">{errors.lastname}</p>
            {/if}
          </div>

          <div class="flex flex-col">
            <label for="email" class="mb-2 font-bold"> Email </label>
            <div class="border-b text-dim-gray mb-2 border-current">
              <input
                bind:value={userdata.Email}
                id="email"
                type="email"
                class=" w-full py-1 focus:outline-none focus:ring focus:ring-forest-green text-sm md:text-md"
              />
            </div>
            {#if errors.email}
              <p class="text-red-600 -mt-2 mb-2">{errors.email}</p>
            {/if}
          </div>

          <div class="flex flex-col">
            <label for="pic" class="mb-2"> Picture </label>
            <div class="border-b text-dim-gray mb-2 border-current">
              <input
                bind:value={userdata.Picture}
                id="pic"
                type="url"
                class=" w-full py-1 focus:outline-none focus:ring focus:ring-forest-green text-sm md:text-md"
              />
            </div>
            {#if errors.email}
              <p class="text-red-600 -mt-2 mb-2">{errors.email}</p>
            {/if}
          </div>
        </div>
        {#if loading}
          <Spinner />
        {:else}
          <div class="flex justify-center mt-8">
            <button
              type="submit"
              class="flex p-4 justify-center items-center font-bold text-2xl text-white bg-forest-green rounded-xl hover:bg-cyprus-green"
            >
              Change
            </button>
          </div>
          <div class="flex justify-center">
            {#if errors.update}
              <p class="text-red-600 mt-4 mb-2">{errors.update}</p>
            {/if}
          </div>
        {/if}
      </form>
    {:else}
      <section class="bg-white shadow-md w-3/4 mx-auto p-4" in:fade>
        <div class="flex flex-col justify-center items-center gap-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 31.5 31.5"
            class="h-32 w-32 fill-current text-forest-green"
            ><g transform="translate(-2.25 -2.25)">
              <path
                d="M15.75,24.091l-5.625-5.626,1.59-1.59,4.035,4.034,8.533-8.534,1.592,1.592Z"
              /><path
                d="M18,2.25A15.75,15.75,0,1,0,33.75,18,15.75,15.75,0,0,0,18,2.25ZM18,31.5A13.5,13.5,0,1,1,31.5,18,13.5,13.5,0,0,1,18,31.5Z"
              />
            </g></svg
          >
          <p class="text-lg lg:text-2xl">User succefully updated</p>
          <div class="flex flex-col md:flex-row md:gap-4">
            <button
              class="flex p-4 mx-auto mt-4 justify-center items-center font-bold text-md lg:text-2xl text-white bg-forest-green rounded-xl hover:bg-cyprus-green"
              on:click={goBack}>Go back</button
            >
          </div>
        </div>
      </section>
    {/if}
  </section>
</section>
