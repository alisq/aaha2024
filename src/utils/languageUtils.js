export const getBrowserLang = () => (
  window.navigator.languages ?
    window.navigator.languages[0] : (
      window.navigator.language || window.navigator.browserLanguage || window.navigator.userLanguage
    )
).split('-')[0].split('_')[0]

