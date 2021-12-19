<script>
  import { setupI18n, locale } from '../../utils/i18n'

  import LocaleSwitcher from './LocaleSwitcher.svelte'
</script>

<footer
  class="bg-white flex flex-col gap-8 sm:flex-row py-8 px-6 justify-between flex-end mt-auto"
>
  <section
    class="grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8 items-baseline"
  >
    <article class="text-sm col-span-2 xl:col-span-1">
      <h1 class="text-forest-green font-bold text-2xl pb-2">MCT airlines</h1>
      <p>We offer you quality service for life!</p>
      <p>Fly with style!</p>
    </article>

    <article class="lg:px-2 text-sm">
      <h2 class="font-bold text-base pb-2">Visit</h2>
      <div>
        <p>Marksesteenweg 58</p>
        <p>8500 Kortrijk</p>
      </div>
    </article>

    <article class="lg:px-2 text-sm">
      <h2 class="font-bold text-base pb-2">Contact</h2>
      <a rel="preconnect" href="tel:555-555-5555">+32 555 55 55 55</a><br />
      <a rel="preconnect" href="mailto: info@mctairlines.be"
        >info@mctairlines.be</a
      >
    </article>
  </section>
  <section class="flex my-auto flex-col gap-2">
    <article>
      <p class="text-forest-green font-bold text-sm">
        &copy; 2021 MCT Airlines. All rights Reserved
      </p>
    </article>
    <div class="self-end">
      <LocaleSwitcher
        value={$locale}
        on:locale-changed={e => setupI18n({ withLocale: e.detail })}
      />
    </div>
  </section>
</footer>
