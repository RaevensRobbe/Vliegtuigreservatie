<script lang="ts">
    import { emailValidator, requiredValidator } from '../../composables/inputValidator';
    import Intertitle from '../../components/Intertitle.svelte'

    let errors:any = {};

    let email:string;
    let firstName:string
    let lastName:string

    const onSubmit = () => {
        if(requiredValidator(email) && requiredValidator(firstName) && requiredValidator(lastName)){
            errors.firstname = "Firstname is required"
            errors.lastname = "Lastname is required"
            errors.email = "Email is required"
            return
        }

        if(requiredValidator(email)){
            errors.firstname = "Firstname is required"
            return
        }else errors.firstname = ""

        if(requiredValidator(firstName)){
            errors.lastname = "Lastname is required"
            return
        }else errors.lastname = ""

        if(requiredValidator(email)){
            errors.email = "Email is required"
            return
        }else{
            if(!emailValidator(email)){
                errors.email = "Invalid email"
                return
            }else errors.email = ""
        }
    }


</script>

<section class="p-4 px-6 align-start">
    <Intertitle titleName = "Edit account details" />

    <section class ="w-screen flex justify-center self-center">
        <form on:submit|preventDefault={onSubmit} class = "bg-white shadow-lg p-10 w-1/2">
            <div class="grid grid-cols-3 grid-row-2 gap-10">
                <div class="flex flex-col">
                    <label for="firstname" class="mb-2">
                        First name
                    </label>
                    <input  
                        bind:value={firstName}
                        id="firstname"
                        type="text"
                        class="border-b mb-4 h-8 focus:outline-none focus:ring focus:ring-forest-green shadow-md bg-gray-100" 
                    />
                    {#if errors.firstname}
                        <p class="text-red-600 -mt-2 mb-2">{errors.firstname}</p>
                    {/if}
                </div>
    
                <div class="flex flex-col">
                    <label for="lastname" class="mb-2">
                        Last name
                    </label>
                    <input  
                        bind:value={lastName}
                        id="lastname"
                        type="text"
                        class="border-b mb-4 h-8 focus:outline-none focus:ring focus:ring-forest-green shadow-md bg-gray-100" 
                    />
                    {#if errors.lastname}
                        <p class="text-red-600 -mt-2 mb-2">{errors.lastname}</p>
                    {/if}
                </div>
    
                <div class="flex flex-col">
                    <label for="email" class="mb-2">
                        Email
                    </label>
                    <input  
                        bind:value={email}
                        id="email"
                        type="email"
                        class="border-b mb-4 h-8 focus:outline-none focus:ring focus:ring-forest-green shadow-md bg-gray-100" 
                    />
                    {#if errors.email}
                        <p class="text-red-600 -mt-2 mb-2">{errors.email}</p>
                    {/if}
                </div>
    
                <div class="flex flex-col w-full">
                    <label for="picture" class="mb-2">
                        Picture
                    </label>
                    <input  
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
            </div>

        </form>  
    </section>
</section>



