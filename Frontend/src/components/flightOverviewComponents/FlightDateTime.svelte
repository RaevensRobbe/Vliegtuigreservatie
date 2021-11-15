<script lang="ts">
  export let retour: boolean

  let startLocation: string
  let endLocation: string

  if (retour) {
    startLocation = 'Milan Malpensa'
    endLocation = 'Brussel-Zaventem'
  } else {
    startLocation = 'Brussel-Zaventem'
    endLocation = 'Milan Malpensa'
  }
</script>

<section class="flex flex-col my-4 text-center">
  <h1 class="font-bold text-forest-green text-lg">09 October</h1>
  <div class="my-2">
    <p class="font-bold text-cyprus-green">08:20</p>
    <p>{startLocation}</p>
  </div>
  <div class="self-center">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="fill-current text-cyprus-green h-3 md:h-4 {retour
        ? 'scale-x-[-1]'
        : ''}"
      viewBox="0 0 44 22.458"
    >
      <g
        id="Flight_icon"
        data-name="Flight icon"
        transform="translate(-829 -1009.771)"
      >
        <path
          id="bxs-plane-take-off"
          d="M46.813,14.674a3.616,3.616,0,0,0-4.572-2.288L32.195,15.737,14.229,9,9.737,11.246l13.475,8.983L14.229,24.72,5.246,20.229,3,22.475l8.983,8.983,32.67-12.251a3.619,3.619,0,0,0,2.16-4.532Z"
          transform="translate(826 1000.771)"
        />
      </g>
    </svg>
  </div>
  <div class="my-2">
    <p class="font-bold text-cyprus-green">09:50</p>
    <p>{endLocation}</p>
  </div>
</section>
