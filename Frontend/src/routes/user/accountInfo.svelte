<script lang="ts">
  import { emailValidator, requiredValidator, confirmValidator } from '../../utils/inputValidator'
  import Intertitle from '../../components/Intertitle.svelte'
  import { onMount } from 'svelte'
  import { get, post } from '../../utils/useApi'
  import authStore from '../../stores/authStore'
  import { updateCurrentUser, updateEmail, updatePassword, updateProfile } from '@firebase/auth'
  import { getAuth } from 'firebase/auth'
  import { put } from '../../utils/useApi'
  import { goto } from '$app/navigation'
 
  const auth = getAuth()
  const user = auth.currentUser

  let errors: any = {}
  let succes: any = {}
  let userdata: any = {}
  let pw:string
  let cpw:string
  let test:string = ''

  onMount(async () => {
    console.log($authStore.user.uid)
    const getData = await get(
      `http://localhost:3001/api/v1/user/data/${$authStore.user.uid}`,
    )
    userdata = getData
    console.log(userdata)
  })

  async function updateUser(data) {
    const res = await put(`http://localhost:3001/api/v1/user/updateUser/${$authStore.user.uid}`, data)
    if(res.success) {
      //ROBBE FIX LOADING DINGKIE
      succes.update = 'User data updated'
      console.log('yeey')
    }else{
      console.log('NEEY')
    }
  }

  const changeUserData = () => {
    succes.update = ''
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
            const data:{firstname:string, lastname:string, email:string} = {
              firstname: userdata.Firstname,
              lastname: userdata.Lastname,
              email: userdata.Email,
            }
            updateUser(data)
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
      console.log(errors)
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

  const changePassword = async () => {
    updatePassword(auth.currentUser, pw).then(() => {
      //ROBBE FIX LOADING DINGKIE
      console.log('yeey')
    }).catch((error) => {
      if(error.message === 'Firebase: Password should be at least 6 characters (auth/weak-password).')
        errors.updatepw ='Password to weak'
      else{
        errors.updatepw = 'Something went wrong'
      }
      console.log(error.message)
      
    })  
  }

  const onSubmitPassword = () => {
    console.log(pw)
    if(requiredValidator(pw) && requiredValidator(cpw)){
      console.log('test2')
      errors.newPw = 'New password is required'
      errors.cNewPw = 'Confirm password is required'
      return 
    }else{
      errors.newPw = ''
      errors.cNewPw = ''
    }
    if(!confirmValidator(pw, cpw)){
      errors.cNewPw = 'Passwords dont match'
      return 
    }else{
      errors.cNewPw = ''
    }

    if (requiredValidator(pw)) {
      errors.newPw = 'Password is required'
      return
    } else errors.newPw = ''

    if (requiredValidator(cpw)) {
      errors.cNewPw = 'Confirm password'
      return
    } else errors.cNewPw = ''

    changePassword()
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
              class=" w-full py-1 focus:outline-none focus:ring focus:ring-forest-green text-sm md:text-md"
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
              class=" w-full py-1 focus:outline-none focus:ring focus:ring-forest-green text-sm md:text-md"
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
          {#if errors.picture}
            <p class="text-red-600 -mt-2 mb-2">{errors.picture}</p>
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

  <section class="flex justify-center self-center">
    <form
      on:submit|preventDefault={onSubmitPassword} 
      class="w-4/5 sm:w-3/5 md:w-4/5 lg:w-3/5 bg-white p-8 flex flex-col shadow-md"
    >

      <div class="flex flex-col">
        <label for="password" class="mb-2"> New password </label>
        <div class="border-b text-dim-gray mb-2 border-current">
          <input
            bind:value={pw}
            id="password"
            type="password"
            class=" w-full py-1 focus:outline-none focus:ring focus:ring-forest-green text-sm md:text-md"
          />
        </div>
        {#if errors.newPw}
          <p class="text-red-600 -mt-2 mb-2">{errors.newPw}</p>
        {/if}
      </div>

      <div class="flex flex-col">
        <label for="cpassword" class="mb-2"> Confirm password </label>
        <div class="border-b text-dim-gray mb-2 border-current">
          <input
            bind:value={cpw}
            id="cpassword"
            type="password"
            class=" w-full py-1 focus:outline-none focus:ring focus:ring-forest-green text-sm md:text-md"
          />
        </div>
        {#if errors.cNewPw}
          <p class="text-red-600 -mt-2 mb-2">{errors.cNewPw}</p>
        {/if}
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
        {#if errors.updatepw}
          <p class="text-red-600 -mt-2 mb-2">{errors.updatepw}</p>
        {/if} 
      </div>

    </form>
  </section>
  
</section>
