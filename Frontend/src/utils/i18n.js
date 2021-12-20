import {
    dictionary,
    init,
    locale,
    register,
    _
  } from 'svelte-i18n';
  import languageStore from '../stores/languageStore'
  // @ts-ignore
  register('en', () => import('./lang/en.json'))

  init({
    fallbackLocale: 'en',
    initialLocale: 'en',
  })
  const MESSAGE_FILE_URL_TEMPLATE = '/src/utils/lang/{locale}.json';
  //const MESSAGE_FILE_URL_TEMPLATE = '/static/lang/{locale}.json';
  let cachedLocale;

  function setupI18n({ withLocale: _locale } = { withLocale: 'en' }) {
    languageStore.set({language:_locale})
    const messsagesFileUrl = MESSAGE_FILE_URL_TEMPLATE.replace('{locale}', _locale);
    return fetch(messsagesFileUrl)
        .then(response => response.json())
        .then((messages) => {
            dictionary.set({ [_locale]: messages });
 
            cachedLocale = _locale;
 
            locale.set(_locale);
        });
}
 
export { _, locale, setupI18n };
  