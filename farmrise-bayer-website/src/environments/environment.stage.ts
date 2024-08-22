import { DefaultPrivacyLevel } from "@datadog/browser-rum";

export const environment = {
  production: false,
  websiteAggregatorServiceUrl: 'https://stage.farmrise.bayer.com/stage/v1/aggregator/web',
  xApiKey: '9blnIWtwpI4TmiIGfac0F28KrnpPgKPaP8RU6yS7',
  appDownloadBannerDynamicLink: 'https://farmrisetest.page.link/ybtG',
  appDownloadPopupDynamicLink: 'https://farmrisetest.page.link/36K2',
  recaptchaSiteKey: '6LfppHImAAAAAPyaTuZhI7HhaPd884YRubP0dIbs',
  ipfyUrl: 'https://api.ipify.org/?format=json',
  gtag: {
    src: 'https://www.googletagmanager.com/gtag/js?id=G-11N9KTPFZS',
    innerHtml: `window.dataLayer = window.dataLayer || [];   function gtag(){dataLayer.push(arguments);}   gtag('js', new Date());   gtag('config', 'G-11N9KTPFZS');`
  },
  careers: 'https://jobs.bayer.com/search/?createNewAlert=false&q=FarmRise&locationsearch=India',
  datadog: {
    applicationId: '5094ca0d-6f33-46cc-af72-a960b66ad5eb',
    clientToken: 'pub74276ccd17c22f952daf3abf47a33c60',
    site: 'datadoghq.com',
    service: 'farmrise-website',
    env: 'stage',
    sessionSampleRate: 100,
    sessionReplaySampleRate: 20,
    trackUserInteractions: true,
    trackResources: true,
    trackLongTasks: true,
    defaultPrivacyLevel: DefaultPrivacyLevel.MASK_USER_INPUT,
  }
};