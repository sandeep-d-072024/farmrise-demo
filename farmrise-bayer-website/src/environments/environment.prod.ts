import { DefaultPrivacyLevel } from "@datadog/browser-rum";

export const environment = {
  production: true,
  websiteAggregatorServiceUrl: 'https://farmrise.bayer.com/prod/v1/aggregator/web',
  xApiKey: 'P5QqYGurXr1lUCqokXo9N54qc78r05TX7P9ahEDC',
  appDownloadBannerDynamicLink: 'https://share.farmrise.com/CsTV',
  appDownloadPopupDynamicLink: 'https://share.farmrise.com/Pw1J',
  recaptchaSiteKey: '6LfppHImAAAAAPyaTuZhI7HhaPd884YRubP0dIbs',
  ipfyUrl: 'https://api.ipify.org/?format=json',
  gtag: {
    src: 'https://www.googletagmanager.com/gtag/js?id=G-C0FGFJYKFX',
    innerHtml: `window.dataLayer = window.dataLayer || [];   function gtag(){dataLayer.push(arguments);}   gtag('js', new Date());   gtag('config', 'G-C0FGFJYKFX');`
  },
  careers: 'https://jobs.bayer.com/search/?createNewAlert=false&q=FarmRise&locationsearch=India',
  datadog: {
    applicationId: '5094ca0d-6f33-46cc-af72-a960b66ad5eb',
    clientToken: 'pub74276ccd17c22f952daf3abf47a33c60',
    site: 'datadoghq.com',
    service: 'farmrise-website',
    env: 'prod',
    sessionSampleRate: 100,
    sessionReplaySampleRate: 20,
    trackUserInteractions: true,
    trackResources: true,
    trackLongTasks: true,
    defaultPrivacyLevel: DefaultPrivacyLevel.MASK_USER_INPUT,
  }
};