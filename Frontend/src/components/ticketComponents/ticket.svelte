<script lang="ts">
  //@ts-ignore
  import Barcode from 'svelte-barcode'
</script>

<div class="flex flex-col bg-white rounded-xl">
  <div class="bg-forest-green grid grid-cols-7 text-white rounded-t-xl">
    <h1 class="font-bold text-2xl md:text-4xl col-span-3 md:col-span-3 p-4">
      MCT Airlines
    </h1>
    <div class="col-span-4 md:col-span-2 my-auto">
      <div class="p-4 grid grid-rows-2 justify-items-end text-right">
        <p>Boarding pass</p>
        <p>Economy</p>
      </div>
    </div>
    <div class="col-span-2 border-l-2 border-dashed hidden md:grid">
      <div class="p-4 grid grid-rows-2">
        <p>Boarding pass</p>
        <p>Economy</p>
      </div>
    </div>
  </div>
  <div class="grid grid-cols-7">
    <div class="col-span-7 md:col-span-3 p-4">
      <div class="grid grid-rows-3 gap-4">
        <div>
          <p class="text-sm">Passenger name</p>
          <p class="text-black uppercase text-xl">John Doe</p>
        </div>
        <div>
          <p class="text-sm">From</p>
          <p class="text-black uppercase text-xl">BRUSSEL-ZAVENTEM</p>
        </div>
        <div>
          <p class="text-sm">To</p>
          <p class="text-black uppercase text-xl">MILAN-MALPENSA</p>
        </div>
        <div
          class="overflow-x-hidden hidden xs:block sm:block md:hidden lg:block"
        >
          <Barcode
            value={'ticket barcode'}
            elementTag={'canvas'}
            width="2"
            height="70"
            displayValue="false"
            background=""
            marginLeft="0"
            marginRight="0"
          />
        </div>
        <div class="overflow-x-hidden xs:hidden sm:hidden md:block lg:hidden">
          <Barcode
            value={'svelte-barcode'}
            elementTag={'canvas'}
            width="1"
            height="70"
            displayValue="false"
            background=""
            marginLeft="0"
            marginRight="0"
          />
        </div>
      </div>
    </div>
    <div class="col-span-7 md:col-span-2 p-4">
      <div class="grid grid-rows-3 gap-4">
        <div class="grid grid-cols-2">
          <div>
            <p class="text-sm">Date</p>
            <p class="text-black uppercase text-xl">09OCT</p>
          </div>
          <div>
            <p class="text-sm">Time</p>
            <p class="text-black uppercase text-xl">08:20</p>
          </div>
        </div>
        <div class="grid grid-cols-2">
          <div>
            <p class="text-sm">Flight</p>
            <p class="text-black uppercase text-xl">A 0137</p>
          </div>
          <div>
            <p class="text-sm">Seat</p>
            <p class="text-black uppercase text-xl">4F</p>
          </div>
        </div>
        <div class="grid grid-cols-2">
          <div>
            <p class="text-sm">Gate</p>
            <p class="text-black uppercase text-xl">12</p>
          </div>
          <div>
            <p class="text-sm">Board till</p>
            <p class="text-black uppercase text-xl">07:50</p>
          </div>
        </div>
      </div>
    </div>
    <div
      class="col-span-7 md:col-span-2 p-4 border-t-2 md:border-t-0 md:border-l-2 border-dashed"
    >
      <div class="grid grid-rows-3 gap-4">
        <div>
          <p class="text-sm">Passenger name</p>
          <p class="text-black uppercase">JOHN DOE</p>
        </div>
        <div>
          <p class="text-sm">From</p>
          <p class="text-black uppercase">BRUSSEL-ZAVENTEM</p>
        </div>
        <div>
          <p class="text-sm">To</p>
          <p class="text-black uppercase">Milan Malpensa</p>
        </div>
        <div class="grid grid-cols-3">
          <div>
            <p class="text-sm">Time</p>
            <p class="text-black uppercase">08:20</p>
          </div>
          <div>
            <p class="text-sm">Seat</p>
            <p class="text-black uppercase">4F</p>
          </div>
          <div>
            <p class="text-sm">Board till</p>
            <p class="text-black uppercase">07:50</p>
          </div>
        </div>
        <div class="grid grid-cols-3">
          <div>
            <p class="text-sm">Gate</p>
            <p class="text-black uppercase">12</p>
          </div>
          <div>
            <p class="text-sm">Date</p>
            <p class="text-black uppercase">09OCT</p>
          </div>
          <div>
            <p class="text-sm">Flight</p>
            <p class="text-black uppercase">A 0137</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
