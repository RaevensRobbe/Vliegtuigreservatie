<script lang="ts">
    import type PopularDestination from "./../models/PopularDestinationModel.type"
    export let popularDestination: PopularDestination;
    console.log("pop dest card")
    console.log(popularDestination);
</script>

<button class="flex flex-col shadow-md">
    <div>
        <!-- svelte-ignore a11y-img-redundant-alt -->
        <img class="" src="https://i.stack.imgur.com/y9DpT.jpg" alt="Image" />
    </div>
    <span class="h-2 w-3/4 bg-forest-green block"></span>
    <div class="w-full flex justify-between items-center p-2">
        <div>
            <h1 class="font-bold text-lg text-dim-gray mb-1 whitespace-nowrap overflow-hidden">{ popularDestination.Dest[0].Name }, { popularDestination.Name}</h1>
            <div class="flex">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" viewBox="0 0 28.48 35.065">
                    <path id="Subtraction_1" data-name="Subtraction 1" d="M708.24-1370.935h0a70.014,70.014,0,0,1-10.657-11.613c-2.377-3.465-3.582-6.564-3.582-9.211a14.147,14.147,0,0,1,4.171-10.069A14.147,14.147,0,0,1,708.24-1406a14.147,14.147,0,0,1,10.069,4.171,14.147,14.147,0,0,1,4.171,10.069c0,2.669-1.205,5.79-3.582,9.278a65.6,65.6,0,0,1-10.657,11.547ZM708-1397a5.006,5.006,0,0,0-5,5,5.006,5.006,0,0,0,5,5,5.006,5.006,0,0,0,5-5A5.005,5.005,0,0,0,708-1397Z" transform="translate(-694 1406)" fill="#fc5757"/>
                  </svg>
                    <p>520 km</p>                  
            </div>
            
        </div>
        <h1 class="font-bold text-lg text-forest-green">See more</h1>
    </div>
</button>