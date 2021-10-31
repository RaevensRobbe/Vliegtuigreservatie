 <script lang="ts">
import { createUserWithEmailAndPassword, updateCurrentUser, updateProfile} from "@firebase/auth";
import { getAuth } from "firebase/auth";
import authStore from "../../stores/authStore";

     let email:string;
     let firstName:string
     let lastName:string
     let pw:string
     let cpw:string

     const register = () => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, pw)
        .then((userCredential) => {
            const user = userCredential.user
            console.log('Yeey aanmaken gelukt')
            updateProfile(user , {displayName: firstName})
            .then(() =>{
                console.log('yeey updaten gelukt')
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
        //console.log($authStore.user.displayName
     }

</script>

<div class="absolute inset-0 ">
    <div class="relative inset-1/2 z-10 backdrop-filter">
            <form
                class="relative z-100 w-1/4 bg-white p-8 flex flex-col"
            >
                <h1 class=" text-2xl text-forest-green mb-4">Register</h1>

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

                <label for="firstName" class="mb-2">First Name</label>
                <input
                    bind:value={firstName}
                    type="text" 
                    id="firstName"
                    class="w-full border-b mb-4 h-8 focus:outline-none focus:ring focus:ring-forest-green"
                />

                <label for="lastName" class="mb-2">Last Name</label>
                <input
                    bind:value={lastName}
                    type="text" 
                    id="lastName"
                    class="w-full border-b mb-4 h-8 focus:outline-none focus:ring focus:ring-forest-green"
                />

                <label for="pw" class="mb-2">Password</label>
                <input
                    bind:value={pw}
                    type="password" 
                    id="pw"
                    class="w-full border-b mb-4 h-8 focus:outline-none focus:ring focus:ring-forest-green"
                />

                <label for="cpw" class="mb-2">Confirm Password</label>
                <input
                    bind:value={cpw}
                    type="password" 
                    id="cpw"
                    class="w-full border-b mb-4 h-8 focus:outline-none focus:ring focus:ring-forest-green"
                />


            <button
                on:click={register}
                type="button"
                class="bg-forest-green rounded-full p-2 mt-4 font-bold text-2xl text-white" 
            >
                Register
            </button>
        </form>
    </div>
</div>