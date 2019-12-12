/* eslint-disable @typescript-eslint/no-explicit-any */
import '@stratsys/pdr/full-runtime'
import '@/##TAG_NAME##'

// eslint-disable-next-line no-undef
const pdrWindow = window as any
pdrWindow.PDR.init({
  auth: {
    authorityUrl: 'https://logintest.stratsys.se/dev',

    silentRedirectPath: '/callbackSilent.html',
    popupRedirectPath: '/callbackPopup.html',

    clientId: 'stratsys-frontend-debug',
    responseType: 'id_token token',
    scope: ['openid', 'profile'].join(' ')
  },
  lang: 'sv'
})
