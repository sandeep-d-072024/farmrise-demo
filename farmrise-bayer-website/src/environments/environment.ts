// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { DefaultPrivacyLevel } from "@datadog/browser-rum";

export const environment = {
  production: false,
  websiteAggregatorServiceUrl: 'https://qa.farmrise.bayer.com/qa/v1/aggregator/web',
  xApiKey: '199XWi552m7LyoopT1AnW5N9yYn3giTf9den380g',
  appDownloadBannerDynamicLink: 'https://farmrisetest.page.link/ybtG',
  appDownloadPopupDynamicLink: 'https://farmrisetest.page.link/36K2',
  recaptchaSiteKey: '6LfppHImAAAAAPyaTuZhI7HhaPd884YRubP0dIbs',
  ipfyUrl: 'https://api.ipify.org/?format=json',
  gtag: {
    src: 'https://www.googletagmanager.com/gtag/js?id=G-11N9KTPFZS',
    innerHtml: `window.dataLayer = window.dataLayer || [];   function gtag(){dataLayer.push(arguments);}   gtag('js', new Date());   gtag('config', 'G-11N9KTPFZS');`
  },
  careers: 'https://jobs.bayer.com/search/?createNewAlert=false&q=FarmRise&locationsearch=India',
  //datadog related variables.
  datadog: {
    applicationId: '5094ca0d-6f33-46cc-af72-a960b66ad5eb',
    clientToken: 'pub74276ccd17c22f952daf3abf47a33c60',
    site: 'datadoghq.com',
    service: 'farmrise-website',
    env: 'local',
    sessionSampleRate: 100,
    sessionReplaySampleRate: 20,
    trackUserInteractions: true,
    trackResources: true,
    trackLongTasks: true,
    defaultPrivacyLevel: DefaultPrivacyLevel.MASK_USER_INPUT,
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.