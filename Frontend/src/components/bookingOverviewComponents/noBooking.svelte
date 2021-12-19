<script lang="ts">
  export let booking: string = ''
  import { _ } from '../../utils/i18n'
  import { init } from 'svelte-i18n'
  import languageStore from '../../stores/languageStore'
  
  init({
      fallbackLocale: 'en',
      initialLocale: $languageStore.language,
    })
</script>

<div class="bg-white my-6 shadow-md md:mx-6">
  <p class="py-6 text-2xl text-center font-bold text-forest-green">
    {$_('bookings.no')} {booking} {$_('bookings.bookings')}
  </p>
</div>
