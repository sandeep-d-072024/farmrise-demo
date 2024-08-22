import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DesktopHomePageComponent } from './desktop-home-page/desktop-home-page.component';
import { MobileHomePageComponent } from './mobile-home-page/mobile-home-page.component';
import { MarketPricingComponent } from './market-pricing/market-pricing.component';
import { GovernmentSchemesComponent } from './government-schemes/government-schemes.component';
import { ExpertArticlesComponent } from './expert-articles/expert-articles.component';
import { LatestNewsComponent } from './latest-news/latest-news.component';
import { AboutFarmriseComponent } from './about-farmrise/about-farmrise.component';
import { VerifyProductsInfoComponent } from './verify-products-info/verify-products-info.component';
import { CropDoctorInfoComponent } from './crop-doctor-info/crop-doctor-info.component';
import { LocationResolver } from './resolvers/location.resolver';
import { AppDownloadBannerComponent } from './app-download-banner/app-download-banner.component';
import { DialogUtilityComponent } from './dialog-utility/dialog-utility.component';

const routes: Routes = [{
  path: '',
  component: window.screen.width > 912 ? DesktopHomePageComponent : MobileHomePageComponent,
  resolve: {location: LocationResolver},
  data: {
    title: 'Farmrise Home Page',
    description: 'FarmRise provides daily temperature, rainfall and humidity information to the farmers. You can get the temperature and rainfall information for the next 9 days hourly through the app. This helps the farmers to take the right decisions regarding their crops and fields.',
    robots: 'index,follow'
  }
},
{
  path: 'market-pricing/:cropName',
  component: MarketPricingComponent,
  data: {
    title: 'Nearby Mandi',
    description: 'Get Mandi pricing of crops in nearby mandi',
    robots: 'index,follow'
  }
},
{
  path: 'government-scheme/:schemeId',
  component: GovernmentSchemesComponent,
  data: {
    title: 'Government schemes',
    description: 'Get knowledge about different government schemes based on your region, all in your favourite language',
    robots: 'index,follow'
  }
},
{
  path: 'expert-article/:title',
  component: ExpertArticlesComponent,
  data: {
    title: 'Expert Articles',
    description: 'Get articles written by field experts on various topics related to agriculture',
    robots: 'index,follow'
  }
},
{
  path: 'news',
  component: LatestNewsComponent,
  data: {
    title: 'Latest News',
    description: 'Get to know latest news related to agriculture, all in your preferred language',
    robots: 'index,follow'
  }
},
{
  path: 'about-us',
  component: AboutFarmriseComponent,
  data: {
    title: 'About Farmrise',
    description: 'Read about the features offered by Farmrise, catering to needs of smallholder farmers',
    robots: 'index,follow'
  }
},
{
  path: 'verify-product-info',
  component: VerifyProductsInfoComponent,
  data: {
    title: 'Verify your Bayer product',
    description: 'Scan the QR code to verify your Bayer product is genuine or not.',
    robots: 'index,follow'
  }
},
{
  path: 'crop-doctor-info',
  component: CropDoctorInfoComponent,
  data: {
    title: 'Crop doctor',
    description: 'Get to know about plant, crop related issues on Farmrise app',
    robots: 'index,follow'
  }
},
{
  path: 'terms-and-conditions',
  component: DialogUtilityComponent
},
{
  path: 'privacy-policy',
  component: DialogUtilityComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
