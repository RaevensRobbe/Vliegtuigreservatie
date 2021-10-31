 <script lang="ts">
    import { createUserWithEmailAndPassword, updateCurrentUser, updateProfile} from "@firebase/auth";
    import { getAuth } from "firebase/auth";
    import loginCompStore from "../../stores/loginCompStore";
    import authStore from "../../stores/authStore";
    import { requiredValidator, emailValidator, strenghtValidator, confirmValidator } from '../../composables/inputValidator';

     let email:string;
     let firstName:string
     let lastName:string
     let pw:string
     let cpw:string

     let errors:any = {};

     let result = null

     const register = () => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, pw)
        .then((userCredential) => {
            const user = userCredential.user
            console.log('Yeey aanmaken gelukt')

            updateProfile(user , {displayName: firstName})
            .then(() =>{
                console.log('yeey updaten gelukt')
                const data = {
                    id : 20,
                    name : firstName,
                    email :  email
                }
                post(data)
            })
            .catch((error) => {
                console.error(error)
            })
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(error)
        })
     }

     async function post(data) {
         console.log("post functie")
         const res = await fetch('http://localhost:3001/api/v1/user/createUser',{
             method:'POST',
             headers: { "Content-Type": "application/json" },
             body: JSON.stringify({
                data
             })
         })
     }

     const showRegisterForm = () => {
        let registerToggle = $loginCompStore.showRegister
        registerToggle = !registerToggle;
        loginCompStore.set({
            showRegister: registerToggle,
            showLogin: false
        });
    }

    const onSubmit = () => {
        if(requiredValidator(email) && requiredValidator(firstName) && requiredValidator(lastName) && requiredValidator(pw) && requiredValidator(cpw)){
            errors.email = "Email is required"
            errors.firstname = "Firstname is required"
            errors.lastname = "Lastname is required"
            errors.pw = "Password is required"
            errors.cpw = "Confirm Password is required"
            return
        }

        if(requiredValidator(email)){
            errors.email = "Email is required"
            return
        }else{
            if(!emailValidator(email)){
                errors.email = "Invalid Email"
                return
            }else
                errors.email = ""
        }

        if(requiredValidator(firstName)){
            errors.firstname = "Firstname is required"
            return
        }else   
            errors.firstname = ""

        if(requiredValidator(lastName)){
            errors.lastname = "Lastname is required"
            return
        }else   
            errors.lastname = ""

        if(requiredValidator(pw)){
            errors.pw = "Password is required"
            return
        }else{
            if(strenghtValidator(pw) == 1){
                errors.pw = "Password is too short"
                return
            }else if(strenghtValidator(pw) == 2){
                errors.pw = "Password is commonly used"
                return
            }else if(strenghtValidator(pw) == 3){
                errors.pw =" Password is too weak"
                return
            }else{
                errors.pw = ""
            }
        }

        if(requiredValidator(cpw)){
            errors.cpw = "Confirm password is required"
            return
        }else{
            if(!confirmValidator(pw,cpw)){
                errors.cpw = "Passwords don't match"
                return
            }else{
                errors.cpw = ""
            }
        }
            
    }

</script>

<div class="absolute inset-x-1/3 inset-y-1/4 w-screen ">
    <form
        on:submit|preventDefault={onSubmit}
        class="fixed w-1/3 z-10 bg-white p-8 flex flex-col"
    >
        <div class="flex justify-between mb-4">
            <h1 class=" text-2xl text-forest-green">Register</h1>
            <svg on:click={showRegisterForm} xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 fill-current text-forest-green" viewBox="0 0 32 32">
                <path id="Icon_material-close" data-name="Icon material-close" d="M39.5,10.723,36.277,7.5,23.5,20.277,10.723,7.5,7.5,10.723,20.277,23.5,7.5,36.277,10.723,39.5,23.5,26.723,36.277,39.5,39.5,36.277,26.723,23.5Z" transform="translate(-7.5 -7.5)"/>
            </svg>
        </div>
                
        <label for="email" class="mb-2">
            Email
        </label>
        <input  
            bind:value={email}
            id="email"
            type="email"
            placeholder="name@acme.com"
            class="w-full border-b mb-4 h-8 focus:outline-none focus:ring focus:ring-forest-green" 
        />
        {#if errors.email}
            <p class="text-red-600 -mt-2 mb-2">{errors.email}</p>
        {/if}

        <label for="firstName" class="mb-2">First Name</label>
        <input
            bind:value={firstName}
            type="text" 
            id="firstName"
            class=
            "w-full border-b mb-4 h-8 focus:outline-none focus:ring focus:ring-forest-green"
        />
        {#if errors.firstname}
            <p class="text-red-600 -mt-2 mb-2">{errors.firstname}</p>
        {/if}

        <label for="lastName" class="mb-2">Last Name</label>
        <input
            bind:value={lastName}
            type="text" 
            id="lastName"
            class="w-full border-b mb-4 h-8 focus:outline-none focus:ring focus:ring-forest-green"
        />
        {#if errors.lastname}
            <p class="text-red-600 -mt-2 mb-2">{errors.lastname}</p>
        {/if}

        <label for="pw" class="mb-2">Password</label>
        <input
            bind:value={pw}
            type="password" 
            id="pw"
            class="w-full border-b mb-4 h-8 focus:outline-none focus:ring focus:ring-forest-green"
        />
        {#if errors.pw}
            <p class="text-red-600 -mt-2 mb-2">{errors.pw}</p>
        {/if}

        <label for="cpw" class="mb-2">Confirm Password</label>
        <input
            bind:value={cpw}
            type="password" 
            id="cpw"
            class="w-full border-b mb-4 h-8 focus:outline-none focus:ring focus:ring-forest-green"
        />
        {#if errors.cpw}
            <p class="text-red-600 -mt-2 mb-2">{errors.cpw}</p>
        {/if}

        <!-- <button
            on:click={register}
            type="button"
            class="bg-forest-green rounded-full p-2 mt-4 font-bold text-2xl text-white" 
        >
            Register
        </button> -->

        
        <button
            type="submit"
            class="bg-forest-green rounded-full p-2 mt-4 font-bold text-2xl text-white" 
        >
            Register
        </button>
    </form>
</div>