import {
    dictionary,
    init,
    locale,
    register,
    _
  } from 'svelte-i18n';
  // @ts-ignore
  register('en', () => import('./lang/en.json'))

  init({
    // fallback to english if the current locale is not in the dictionary
    fallbackLocale: 'en',
    initialLocale: 'en',
  })
  const MESSAGE_FILE_URL_TEMPLATE = '/src/utils/lang/{locale}.json';

  let cachedLocale;

  function setupI18n({ withLocale: _locale } = { withLocale: 'en' }) {
    console.log('Locale gezeik ' + _locale)
    const messsagesFileUrl = MESSAGE_FILE_URL_TEMPLATE.replace('{locale}', _locale);
    console.log('MessageFileURLDinge ' + messsagesFileUrl )
    return fetch(messsagesFileUrl)
        .then(response => response.json())
        .then((messages) => {
            dictionary.set({ [_locale]: messages });
 
            cachedLocale = _locale;
 
            locale.set(_locale);
        });
}
 
export { _, locale, setupI18n };
  