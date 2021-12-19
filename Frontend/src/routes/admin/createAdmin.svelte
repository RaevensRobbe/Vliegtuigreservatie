<script lang="ts">
  import { goto } from '$app/navigation'
  import Spinner from '../../components/animations/spinner.svelte'
  import { fade } from 'svelte/transition'
  import Intertitle from '../../components/Intertitle.svelte'
  import {
    confirmValidator,
    emailValidator,
    requiredValidator,
    strenghtValidator,
  } from '../../utils/inputValidator'
  import authstore from '../../stores/authStore'
  import { post } from '../../utils/useApi'

  import { _ } from '../../utils/i18n'
  import { init } from 'svelte-i18n'
  import languageStore from '../../stores/languageStore'
  
  init({
      fallbackLocale: 'en',
      initialLocale: $languageStore.language,
  })

  let email: string
  let firstName: string
  let lastName: string
  let pw: string
  let cpw: string
  let submitted: boolean = false
  let failed: boolean = false
  let succes: boolean = false

  let errors: any = {}

  const onSubmit = () => {
    if (
      requiredValidator(email) &&
      requiredValidator(firstName) &&
      requiredValidator(lastName) &&
      requiredValidator(pw) &&
      requiredValidator(cpw)
    ) {
      errors.email = 'Email is required'
      errors.firstname = 'Firstname is required'
      errors.lastname = 'Lastname is required'
      errors.pw = 'Password is required'
      errors.cpw = 'Confirm Password is required'
      return
    }

    if (requiredValidator(email)) {
      errors.email = 'Email is required'
      return
    } else {
      if (!emailValidator(email)) {
        errors.email = 'Invalid Email'
        return
      } else errors.email = ''
    }

    if (requiredValidator(firstName)) {
      errors.firstname = 'Firstname is required'
      return
    } else errors.firstname = ''

    if (requiredValidator(lastName)) {
      errors.lastname = 'Lastname is required'
      return
    } else errors.lastname = ''

    if (requiredValidator(pw)) {
      errors.pw = 'Password is required'
      return
    } else {
      if (strenghtValidator(pw) == 1) {
        errors.pw = 'Password is too short'
        return
      } else if (strenghtValidator(pw) == 2) {
        errors.pw = 'Password is commonly used'
        return
      } else if (strenghtValidator(pw) == 3) {
        errors.pw = ' Password is too weak'
        return
      } else {
        errors.pw = ''
      }
    }

    if (requiredValidator(cpw)) {
      errors.cpw = 'Confirm password is required'
      return
    } else {
      if (!confirmValidator(pw, cpw)) {
        errors.cpw = "Passwords don't match"
        return
      } else {
        errors.cpw = ''
      }
    }

    const data: {
      firstName: string
      lastName: string
      email: string
      password: string
      role: string
    } = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: pw,
      role: 'admin',
    }
    submitted = true
    register(data)
  }

  function register(data) {
    $authstore.user.getIdToken(true).then(token => {
      createUser(data, token)
    })
  }

  const createUser = async (data, token) => {
    const result = await post(
      'http://localhost:3001/api/v1/user/createAdmin',
      data,
      token,
    )
    submitted = false
    if (result.succes) {
      //Robbe fix loading dingkie
      console.log('Succes')
      succes = true
    } else {
      //Robbe fixt error
      console.log('Error')
      failed = true
    }
  }

  function goBack() {
    goto('/admin/overviewFlights')
  }

  function addAnotherAdmin() {
    succes = false
    email = null
    firstName = null
    lastName = null
    pw = null
    cpw = null
    submitted = false
  }
</script>

<div class="m-4 md:px-6 ">
  <section
    class="pb-4 flex hover:cursor-pointer hover:font-bold"
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

    <p class="">{$_('addAdmin.gobackBtn')}</p>
  </section>
  <Intertitle titleName={$_('addAdmin.title')}/>
  {#if succes === false}
    <form on:submit|preventDefault={onSubmit} in:fade>
      <section
        class="grid grid-cols-1 lg:grid-cols-2 gap-4 bg-white shadow-md w-3/4 mx-auto p-4"
      >
        <div class="lg:col-span-2">
          <label for="email" class="font-bold"> {$_('addAdmin.email')} </label>
          <div class="border-b text-dim-gray mb-2 border-current">
            <input
              bind:value={email}
              id="email"
              type="email"
              placeholder={$_('addAdmin.emailPlace')}
              class="w-full focus:outline-none py-1 focus:ring focus:ring-forest-green text-sm md:text-md"
            />
          </div>
          {#if errors.email}
            <p class="text-red-600 -mt-2 mb-2">{errors.email}</p>
          {/if}
        </div>
        <div>
          <label for="firstName" class="font-bold"> {$_('addAdmin.firstname')} </label>
          <div class="border-b text-dim-gray mb-2 border-current">
            <input
              bind:value={firstName}
              type="text"
              id="firstName"
              placeholder={$_('addAdmin.fnPlace')}
              class="w-full focus:outline-none py-1 focus:ring focus:ring-forest-green text-sm md:text-md"
            />
          </div>
          {#if errors.firstname}
            <p class="text-red-600 -mt-2 mb-2">{errors.firstname}</p>
          {/if}
        </div>
        <div>
          <label for="lastName" class="font-bold"> {$_('addAdmin.lastname')} </label>
          <div class="border-b text-dim-gray mb-2 border-current">
            <input
              bind:value={lastName}
              type="text"
              id="lastName"
              placeholder= {$_('addAdmin.lnPlace')}
              class="w-full focus:outline-none py-1 focus:ring focus:ring-forest-green text-sm md:text-md"
            />
          </div>
          {#if errors.lastname}
            <p class="text-red-600 -mt-2 mb-2">{errors.lastname}</p>
          {/if}
        </div>
        <div>
          <label for="pw" class="font-bold"> {$_('addAdmin.password')} </label>
          <div class="border-b text-dim-gray mb-2 border-current">
            <input
              bind:value={pw}
              type="password"
              id="pw"
              placeholder= {$_('addAdmin.psPlace')}
              class="w-full focus:outline-none py-1 focus:ring focus:ring-forest-green text-sm md:text-md"
            />
          </div>
          {#if errors.pw}
            <p class="text-red-600 -mt-2 mb-2">{errors.pw}</p>
          {/if}
        </div>
        <div>
          <label for="cpw" class="font-bold"> {$_('addAdmin.cPassword')} </label>
          <div class="border-b text-dim-gray mb-2 border-current">
            <input
              bind:value={cpw}
              type="password"
              id="cpw"
              placeholder= {$_('addAdmin.psPlace')}
              class="w-full focus:outline-none py-1 focus:ring focus:ring-forest-green text-sm md:text-md"
            />
          </div>
          {#if errors.cpw}
            <p class="text-red-600 -mt-2 mb-2">{errors.cpw}</p>
          {/if}
        </div>
      </section>
      {#if submitted}
        <div class="flex p-4 mx-auto mt-4 justify-center items-center">
          <Spinner />
        </div>
      {:else}
        {#if failed}
          <p class="text-red-600 mt-4 flex justify-center">
            Flight add failed please try again
          </p>
        {/if}
        <button
          type="submit"
          class="flex p-4 mx-auto mt-4 justify-center items-center font-bold text-2xl text-white bg-forest-green rounded-xl hover:bg-cyprus-green"
        >
          {$_('addAdmin.button')}
        </button>
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
        <p class="text-lg lg:text-2xl">{$_('addAdmin.succes')}</p>
        <div class="flex flex-col md:flex-row md:gap-4">
          <button
            class="flex p-4 mx-auto mt-4 justify-center items-center font-bold text-md lg:text-2xl text-white bg-forest-green rounded-xl hover:bg-cyprus-green"
            on:click={addAnotherAdmin}>{$_('addAdmin.button2')}</button
          >
          <button
            class="flex p-4 mx-auto mt-4 justify-center items-center font-bold text-md lg:text-2xl text-white bg-forest-green rounded-xl hover:bg-cyprus-green"
            on:click={goBack}>{$_('addAdmin.gobackBtn')}</button
          >
        </div>
      </div>
    </section>
  {/if}
</div>
