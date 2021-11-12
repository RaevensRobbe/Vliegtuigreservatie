<script lang="ts">
  let price = 128.34
  let Adults = [
    {
      title: 'Mr',
      firstName: 'Naruto',
      lastName: 'Uzumaki',
      departureSeat: '4F',
      retourSeat: '4F',
      class: 'Economy',
    },
    {
      title: 'Mrs',
      firstName: 'Sakura',
      lastName: 'Haruno',
      departureSeat: '4F',
      retourSeat: '4F',
      class: 'Economy',
    },
    {
      title: 'Mr',
      firstName: 'Sasuke',
      lastName: 'Uchiha',
      departureSeat: '4F',
      retourSeat: '4F',
      class: 'Economy',
    },
  ]

  let Children

  // let Children = [
  //   {
  //     firstName: 'Hinata ',
  //     lastName: 'Hyuga',
  //     departureSeat: '4F',
  //     retourSeat: '4F',
  //     class: 'Economy',
  //   },
  //   {
  //     firstName: 'Hatake',
  //     lastName: 'Kakashi',
  //     departureSeat: '4F',
  //     retourSeat: '4F',
  //     class: 'Economy',
  //   },
  // ]
</script>

<section class="grid auto-rows-fr w-4/5 mx-auto">
  {#if Adults}
    {#each Adults as adult, index (adult)}
      <div
        class="grid grid-cols-3 {Children
          ? 'border-b-1'
          : index == Adults.length - 1
          ? ''
          : 'border-b-1'} text-dim-gray p-2"
      >
        <div class="flex flex-col">
          <h2 class="text-lg font-bold text-forest-green self-start">
            {adult.firstName}
            {adult.lastName}
          </h2>
          <p class="text-sm self-start">{adult.class} class</p>
        </div>
        <div class="flex justify-center">
          <p
            class="text-lg font-bold text-white bg-forest-green p-2 flex-shrink"
          >
            {adult.departureSeat}
          </p>
        </div>
        <p class="flex text-xl text-cyprus-green self-center">€ {price}</p>
      </div>
    {/each}
  {/if}
  {#if Children}
    {#each Children as child, index (child)}
      <!-- Check if last item yes? dont show border bottom -->
      <div
        class="grid grid-cols-3  {index == Children.length - 1
          ? ''
          : 'border-b-1'} text-dim-gray p-2"
      >
        <div class="flex flex-col">
          <h2 class="text-lg font-bold text-forest-green self-start">
            {child.firstName}
            {child.lastName}
          </h2>
          <p class="text-sm self-start">{child.class} class</p>
        </div>
        <div class="flex justify-center">
          <p
            class="text-lg font-bold text-white bg-forest-green p-2 flex-shrink"
          >
            {child.departureSeat}
          </p>
        </div>
        <p class="flex text-xl text-cyprus-green self-center">€ {price}</p>
      </div>
    {/each}
  {/if}
</section>
