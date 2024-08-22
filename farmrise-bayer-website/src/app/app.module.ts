import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { NgxSpinnerModule } from "ngx-spinner";
import { RecaptchaModule, RecaptchaFormsModule } from "ng-recaptcha";
import { CarouselModule } from "@coreui/angular";
import { AppComponent } from './app.component';
import { DesktopHomePageComponent } from './desktop-home-page/desktop-home-page.component';
import { MobileHomePageComponent } from './mobile-home-page/mobile-home-page.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MarketPricingComponent } from './market-pricing/market-pricing.component';
import { GovernmentSchemesComponent } from './government-schemes/government-schemes.component';
import { ExpertArticlesComponent } from './expert-articles/expert-articles.component';
import { LatestNewsComponent } from './latest-news/latest-news.component';
import { AboutFarmriseComponent } from './about-farmrise/about-farmrise.component';
import { VerifyProductsInfoComponent } from './verify-products-info/verify-products-info.component';
import { CropDoctorInfoComponent } from './crop-doctor-info/crop-doctor-info.component';
import { DateFormatPipe } from './pipes/date-format.pipe';
import { AppDownloadComponent } from './app-download/app-download.component';
import { AppDownloadBannerComponent } from './app-download-banner/app-download-banner.component';
import { MonthDayFormatPipe } from './pipes/month-day-format.pipe';
import { LanguageSelectionComponent } from './language-selection/language-selection.component';
import { ErrorComponent } from './error/error.component';
import { CampaignCarouselBannerComponent } from './campaign-carousel-banner/campaign-carousel-banner.component';
import { SafeUrlPipe } from './pipes/safe-url.pipe';
import { AppDownloadBottomSheetComponent } from './app-download-bottom-sheet/app-download-bottom-sheet.component';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { DialogUtilityComponent } from './dialog-utility/dialog-utility.component';
import { datadogRum } from '@datadog/browser-rum';
import { environment } from 'src/environments/environment';
import { LanguageService } from './services/language.service';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

/**
 * @author Himadri Mandal
 * Here we are initializing the datadog plugin to capture RUM
 * 
 * @see @datadog/browser-rum 
 * @see https://www.npmjs.com/package/@datadog/browser-rum
 */
datadogRum.init({
  applicationId: environment.datadog.applicationId,
  clientToken: environment.datadog.clientToken,
  site: environment.datadog.site,
  service: environment.datadog.service,
  env: environment.datadog.env,
  sessionSampleRate: environment.datadog.sessionSampleRate,
  sessionReplaySampleRate: environment.datadog.sessionReplaySampleRate,
  trackUserInteractions: environment.datadog.trackUserInteractions,
  trackResources: environment.datadog.trackResources,
  trackLongTasks: environment.datadog.trackLongTasks,
  defaultPrivacyLevel: environment.datadog.defaultPrivacyLevel,
});

@NgModule({
  declarations: [
    AppComponent,
    MobileHomePageComponent,
    DesktopHomePageComponent,
    HeaderComponent,
    FooterComponent,
    MarketPricingComponent,
    GovernmentSchemesComponent,
    ExpertArticlesComponent,
    LatestNewsComponent,
    AboutFarmriseComponent,
    VerifyProductsInfoComponent,
    CropDoctorInfoComponent,
    DateFormatPipe,
    AppDownloadComponent,
    AppDownloadBannerComponent,
    MonthDayFormatPipe,
    LanguageSelectionComponent,
    ErrorComponent,
    CampaignCarouselBannerComponent,
    SafeUrlPipe,
    AppDownloadBottomSheetComponent,
    DialogUtilityComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CdkAccordionModule,
    NgxSpinnerModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    CarouselModule,
    MatBottomSheetModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [MobileHomePageComponent, DesktopHomePageComponent, LanguageService],
  bootstrap: [AppComponent]
})
export class AppModule { }