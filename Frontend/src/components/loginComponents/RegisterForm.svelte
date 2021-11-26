<script lang="ts">
  import {
    createUserWithEmailAndPassword,
    updateCurrentUser,
    updateProfile,
  } from '@firebase/auth'
  import { getAuth } from 'firebase/auth'
  import loginCompStore from '../../stores/loginCompStore'
  import authStore from '../../stores/authStore'
  import {
    requiredValidator,
    emailValidator,
    strenghtValidator,
    confirmValidator,
  } from '../../composables/inputValidator'

  let email: string
  let firstName: string
  let lastName: string
  let pw: string
  let cpw: string

  let errors: any = {}

  let result = null

  function showLoginForm() {
    let loginToggle = $loginCompStore.showLogin
    loginToggle = !loginToggle
    loginCompStore.set({
      showRegister: false,
      showLogin: loginToggle,
    })
  }

  const register = () => {
    const auth = getAuth()
    createUserWithEmailAndPassword(auth, email, pw)
      .then(userCredential => {
        const user = userCredential.user

        $authStore.user.displayName = `${firstName} ${lastName}`
        updateProfile(user, { displayName: `${firstName} ${lastName}` })
          .then(() => {
            const data = {
              id: user.uid,
              firstname: firstName,
              lastname: lastName,
              email: email,
            }
            post(data)
            showRegisterForm()
          })
          .catch(error => {
            console.error(error)
          })
      })
      .catch(error => {
        const errorCode = error.code
        const errorMessage = error.message
        if (errorMessage == 'Firebase: Error (auth/email-already-in-use).') {
          errors.email = 'Email already in use'
        }
        console.error(error)
      })
  }

  async function post(data) {
    //  console.log(`post functie ${data}`)
    const res = await fetch('http://localhost:3001/api/v1/user/createUser', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        data,
      }),
    })
  }

  const showRegisterForm = () => {
    let registerToggle = $loginCompStore.showRegister
    registerToggle = !registerToggle
    loginCompStore.set({
      showRegister: registerToggle,
      showLogin: false,
    })
  }

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

    register()
  }
</script>

<div class="absolute top-0 left-0 h-full z-10 w-full">
  <div
    class="flex justify-center items-center w-screen h-screen bg-black bg-opacity-70 fixed"
  >
    <form
      on:submit|preventDefault={onSubmit}
      class="w-4/5 sm:w-3/5 md:w-3/5 lg:w-2/5 xl:w-2/5 2xl:w-2/5 3xl:w-1/5 z-10 bg-white p-8 flex flex-col"
    >
      <div class="flex justify-between mb-4">
        <h1 class=" text-2xl text-forest-green">Register</h1>
        <svg
          on:click={showRegisterForm}
          xmlns="http://www.w3.org/2000/svg"
          class="w-6 h-6 fill-current text-forest-green cursor-pointer"
          viewBox="0 0 32 32"
        >
          <path
            id="Icon_material-close"
            data-name="Icon material-close"
            d="M39.5,10.723,36.277,7.5,23.5,20.277,10.723,7.5,7.5,10.723,20.277,23.5,7.5,36.277,10.723,39.5,23.5,26.723,36.277,39.5,39.5,36.277,26.723,23.5Z"
            transform="translate(-7.5 -7.5)"
          />
        </svg>
      </div>

      <label for="email" class="font-bold"> Email </label>
      <div class="border-b text-dim-gray mb-2 border-current">
        <input
          bind:value={email}
          id="email"
          type="email"
          placeholder="name@acme.com"
          class="w-full focus:outline-none focus:ring focus:ring-forest-green text-sm md:text-md"
        />
      </div>
      {#if errors.email}
        <p class="text-red-600 -mt-2 mb-2">{errors.email}</p>
      {/if}

      <label for="firstName" class="font-bold">First Name</label>
      <div class="border-b text-dim-gray mb-2 border-current">
        <input
          bind:value={firstName}
          type="text"
          id="firstName"
          placeholder="enter first name"
          class="w-full focus:outline-none focus:ring focus:ring-forest-green text-sm md:text-md"
        />
      </div>
      {#if errors.firstname}
        <p class="text-red-600 -mt-2 mb-2">{errors.firstname}</p>
      {/if}

      <label for="lastName" class="font-bold">Last Name</label>
      <div class="border-b text-dim-gray mb-2 border-current">
        <input
          bind:value={lastName}
          type="text"
          id="lastName"
          placeholder="enter last name"
          class="w-full focus:outline-none focus:ring focus:ring-forest-green text-sm md:text-md"
        />
      </div>
      {#if errors.lastname}
        <p class="text-red-600 -mt-2 mb-2">{errors.lastname}</p>
      {/if}

      <label for="pw" class="font-bold">Password</label>
      <div class="border-b text-dim-gray mb-2 border-current">
        <input
          bind:value={pw}
          type="password"
          id="pw"
          placeholder="enter password"
          class="w-full focus:outline-none focus:ring focus:ring-forest-green text-sm md:text-md"
        />
      </div>
      {#if errors.pw}
        <p class="text-red-600 -mt-2 mb-2">{errors.pw}</p>
      {/if}

      <label for="cpw" class="font-bold">Confirm Password</label>
      <div class="border-b text-dim-gray mb-2 border-current">
        <input
          bind:value={cpw}
          type="password"
          id="cpw"
          placeholder="enter password"
          class="w-full focus:outline-none focus:ring focus:ring-forest-green text-sm md:text-md"
        />
      </div>
      {#if errors.cpw}
        <p class="text-red-600 -mt-2 mb-2">{errors.cpw}</p>
      {/if}

      <button
        type="submit"
        class="bg-forest-green rounded-full p-2 mt-4 font-bold text-2xl text-white"
      >
        Register
      </button>

      <div class="mt-4 flex">
        <p>Already have an account?</p>
        <button
          on:click={showLoginForm}
          class="ml-1 font-bold text-forest-green">Login</button
        >
      </div>
    </form>
  </div>
</div>
