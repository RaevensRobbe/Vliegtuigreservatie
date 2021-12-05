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
  
  // async function CreateUser(data, token) {
  //   //console.log(token)
  //   //const res:any = await post('http://localhost:3001/api/v1/user/createAdmin', data)
  //   const res = await fetch('http://localhost:3001/api/v1/user/createAdmin', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Authorization':  `Bearer ${token}`
  //   },
  //   body: JSON.stringify({
  //     data,
  //   }),
  // })
  //   console.log(res)
  // }

  // function testAdminUSer(){
  //   console.log('clicked')
  //   let token:any = ''

  //   auth.currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
  //     //console.log(idToken)
  //     token = idToken
  //     const data:any = {
  //     "displayName" : "Admin Howest",
  //     "password": "P@ssw0rd",
  //     "email": "docent@howest.be",
  //     "role": "admin"
  //   }
  //   CreateUser(data, token)
  //   }).catch(function(error) {
  //     // Handle error
  //   });
  // }
</script>

<section class="p-4 px-6 align-start">
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

  <Intertitle titleName="Edit account details" />

  <section class="w-screen flex justify-center self-center">
    <form
      on:submit|preventDefault={onSubmit}
      class="bg-white shadow-lg p-10 w-1/2"
    >
      <div class="grid grid-cols-3 grid-row-2 gap-10">
        <div class="flex flex-col">
          <label for="firstname" class="mb-2"> First name </label>
          <input
            bind:value={userdata.Firstname}
            id="firstname"
            type="text"
            class="border-b mb-4 h-8 focus:outline-none focus:ring focus:ring-forest-green shadow-md bg-gray-100"
          />
          {#if errors.firstname}
            <p class="text-red-600 -mt-2 mb-2">{errors.firstname}</p>
          {/if}
        </div>

        <div class="flex flex-col">
          <label for="lastname" class="mb-2"> Last name </label>
          <input
            bind:value={userdata.Lastname}
            id="lastname"
            type="text"
            class="border-b mb-4 h-8 focus:outline-none focus:ring focus:ring-forest-green shadow-md bg-gray-100"
          />
          {#if errors.lastname}
            <p class="text-red-600 -mt-2 mb-2">{errors.lastname}</p>
          {/if}
        </div>

        <div class="flex flex-col">
          <label for="email" class="mb-2"> Email </label>
          <input
            bind:value={userdata.Email}
            id="email"
            type="email"
            class="border-b mb-4 h-8 focus:outline-none focus:ring focus:ring-forest-green shadow-md bg-gray-100"
          />
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
            class="border-b mb-4 h-8 focus:outline-none focus:ring focus:ring-forest-green shadow-md bg-gray-100"
          />
          {#if errors.pic}
            <p class="text-red-600 -mt-2 mb-2">{errors.pic}</p>
          {/if}
        </div>
      </div>

      <div class="flex justify-center mt-8">
        <button
          type="submit"
          class="bg-forest-green rounded-full py-2 px-4 mt-4 font-bold text-2xl text-white"
        >
          Change
        </button>

        <!-- <div class="flex justify-center mt-8"> -->
          <!-- <button
            on:click={testAdminUSer}
            type="button"
            class="bg-forest-green rounded-full py-2 px-4 mt-4 font-bold text-2xl text-white"
          >
            Test
          </button> -->
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
