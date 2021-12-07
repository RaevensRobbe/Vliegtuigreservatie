<script lang="ts">
  import { emailValidator, requiredValidator } from '../../utils/inputValidator'
  import Intertitle from '../../components/Intertitle.svelte'
  import { onMount } from 'svelte'
  import { get, post } from '../../utils/useApi'
  import authStore from '../../stores/authStore'
  import { updateCurrentUser, updateEmail, updateProfile } from '@firebase/auth'
  import { getAuth } from 'firebase/auth'
  import { goto } from '$app/navigation'

  const auth = getAuth()
  const user = auth.currentUser

  let errors: any = {}
  let succes: any = {}
  let userdata: any = {}

  onMount(async () => {
    const getData = await get(
      `http://localhost:3001/api/v1/user/${$authStore.user.uid}`,
    )
    userdata = getData
    console.log(userdata)
  })

  async function put(data) {
    console.log(`post functie ${data}`)
    const res = await fetch(
      `http://localhost:3001/api/v1/user/updateUser/${$authStore.user.uid}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          data,
        }),
      },
    )
  }

  const changeUserData = () => {
    succes.update = ''
    console.log(user)
    updateProfile(user, {
      displayName: userdata.Firstname,
      photoURL: userdata.Picture,
    })
      .then(() => {
        updateEmail(user, userdata.Email)
          .then(() => {
            console.log($authStore.user)
            //Goed gegaan
            const data = {
              firstname: userdata.Firstname,
              lastname: userdata.Lastname,
              email: userdata.Email,
            }
            put(data)
            succes.update = 'User data updated'
          })
          .catch(error => {
            console.error(error)
            errors.update = 'Something went wrong'
          })
      })
      .catch(error => {
        console.error(error)
        errors.update = 'Something went wrong'
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
    <form
      on:submit|preventDefault={onSubmit}
      class="w-4/5 sm:w-3/5 md:w-4/5 lg:w-3/5 bg-white p-8 flex flex-col shadow-md"
    >
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="flex flex-col">
          <label for="firstname" class="mb-2"> First name </label>
          <div class="border-b text-dim-gray mb-2 border-current">
            <input
              bind:value={userdata.Firstname}
              id="firstname"
              type="text"
              class="py-1 focus:outline-none focus:ring focus:ring-forest-green text-sm md:text-md"
            />
          </div>

          {#if errors.firstname}
            <p class="text-red-600 -mt-2 mb-2">{errors.firstname}</p>
          {/if}
        </div>

        <div class="flex flex-col">
          <label for="lastname" class="mb-2"> Last name </label>
          <div class="border-b text-dim-gray mb-2 border-current">
            <input
              bind:value={userdata.Lastname}
              id="lastname"
              type="text"
              class="py-1 focus:outline-none focus:ring focus:ring-forest-green text-sm md:text-md"
            />
          </div>
          {#if errors.lastname}
            <p class="text-red-600 -mt-2 mb-2">{errors.lastname}</p>
          {/if}
        </div>

        <div class="flex flex-col">
          <label for="email" class="mb-2"> Email </label>
          <div class="border-b text-dim-gray mb-2 border-current">
            <input
              bind:value={userdata.Email}
              id="email"
              type="email"
              class="py-1 focus:outline-none focus:ring focus:ring-forest-green text-sm md:text-md"
            />
          </div>
          {#if errors.email}
            <p class="text-red-600 -mt-2 mb-2">{errors.email}</p>
          {/if}
        </div>

        <div class="flex flex-col w-full">
          <label for="picture" class="mb-2"> Picture </label>
          <input
            bind:value={userdata.Picture}
            id="picture"
            type="file"
            class="py-1 focus:outline-none focus:ring focus:ring-forest-green text-sm md:text-md"
          />
          {#if errors.pic}
            <p class="text-red-600 -mt-2 mb-2">{errors.pic}</p>
          {/if}
        </div>
      </div>

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
        {#if succes.update}
          <p class="text-forest-green mt-4 mb-2">{succes.update}</p>
        {/if}
      </div>
    </form>
  </section>
</section>
