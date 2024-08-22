import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SpinnerUtils } from '../utils/spinner.util';
import { DataService } from '../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from "../../environments/environment";
import { catchError, throwError } from 'rxjs';
import { LanguageService } from '../services/language.service';
import { Constants } from '../constants/constants';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AppDownloadBottomSheetComponent } from '../app-download-bottom-sheet/app-download-bottom-sheet.component';

@Component({
  selector: 'app-mobile-home-page',
  templateUrl: './mobile-home-page.component.html',
  styleUrls: ['./mobile-home-page.component.scss']
})
export class MobileHomePageComponent implements OnInit {

  apiResponseData: any;
  showWhatsAppCard = true;
  showErrorResponse: boolean = false;
  showEnableLocation: boolean = true;
  weatherIcon: any = sessionStorage.getItem('apiResponseData') != null ? Constants.weather_icons[JSON.parse(sessionStorage.getItem('apiResponseData')!).weatherDetailsResponseBO.icon.toUpperCase()] : '';
  weatherName: any = sessionStorage.getItem('apiResponseData') != null ? Constants.weather_names[JSON.parse(sessionStorage.getItem('apiResponseData')!).weatherDetailsResponseBO.icon.toUpperCase()] : '';
  city: any = sessionStorage.getItem('userLocation') != null ? JSON.parse(sessionStorage.getItem('userLocation')!).city : '';
  detectedDevice = 'desktop';

  @Input()
  userPhoneNumber!: string;
  isPhoneNumberInvalid: boolean = false;

  closeWhatsAppResponseCard: boolean = false

  constructor(private translateService: TranslateService,
    private spinnerUtil: SpinnerUtils,
    private dataService: DataService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private languageService: LanguageService,
    private matBottomSheet: MatBottomSheet)
    {
      setTimeout(() => {
        if(!navigator.userAgent.includes('Android'))
          return;
        else if(sessionStorage.getItem('firstPopupdisplayed'))
          return;
        sessionStorage.setItem('firstPopupdisplayed', 'true')
        this.matBottomSheet.open(AppDownloadBottomSheetComponent)
      }, 10000);
     }

  govtSchemes = [
    {
      schemeId: 5,
      schemeImg: '../../assets/govt_scheme_img.png',
      schemeTitle: 'Senior citizen saving Scheme account',
    },
    {
      schemeId: 99,
      schemeImg: '../../assets/govt_scheme_img.png',
      schemeTitle: 'MH Shop registration license',
    },
  ]

  expertArticles = [
    {
      articleImg: '../../assets/article1.png',
      articleTitle: 'Explaining farming systems spatial patterns Explaining farming',
      articleDate: '15 Apr 2021',
      articleLikes: '98 Likes'
    },
    {
      articleImg: '../../assets/article1.png',
      articleTitle: 'Explaining farming systems spatial patterns',
      articleDate: '15 Apr 2021',
      articleLikes: '98 Likes'
    }
  ]

  testimonials = [
    {
      image: '../../assets/testimonial_1.webp',
      title: 'really_great_app',
      description: 'really_great_app_testimonial'
    },
    {
      image: '../../assets/testimonial_2.webp',
      title: 'like_the_effort',
      description: 'like_the_effort_testimonial'
    }
  ]

  ngOnInit(): void {
    if (sessionStorage.getItem('apiResponseData') != undefined) {
      this.translateService.use(sessionStorage.getItem('language_ISO')!)
      this.languageService.defaultSelectedLanguage.next(this.languageService.languages.filter((lang: any)=> lang.iso6391 === sessionStorage.getItem('language_ISO')).map((lang: any)=> lang.name)[0]);
      this.apiResponseData = sessionStorage.getItem('apiResponseData');
      this.apiResponseData = JSON.parse(this.apiResponseData)
      this.apiResponseData.weatherDetailsResponseBO.icon = this.apiResponseData.weatherDetailsResponseBO.icon.replace('nt_', '');
      this.apiResponseData.govtSchemesList = this.apiResponseData.govtSchemesList.slice(0, 2);
      this.dataService.topCrops = this.apiResponseData.commodityPricesMarketsDetailsBOList
      .map((commodity: { commodityName: any; }) => {
        if(!commodity)
          return
        return commodity.commodityName.toLowerCase()
      })
        this.weatherIcon = Constants.weather_icons[`${this.apiResponseData.weatherDetailsResponseBO.icon}`.toUpperCase()]
        this.weatherName = Constants.weather_names[`${this.apiResponseData.weatherDetailsResponseBO.icon}`.toUpperCase()]
    }
    else {
      let state = this.activatedRoute.snapshot.data['location'].region_code;
      let language = this.languageService.languageMaps.filter((lang: any)=> lang.state === state).map((lang:any)=> lang.iso6391)[0] || 'en';
      this.translateService.use(language)
      let userLocation = {
        latitude: this.activatedRoute.snapshot.data['location'].latitude,
        longitude: this.activatedRoute.snapshot.data['location'].longitude,
        state: this.activatedRoute.snapshot.data['location'].region_code,
        city: this.activatedRoute.snapshot.data['location'].city,
        languageCode: language,
        languageId: this.languageService.languages.filter((lang: any)=> lang.iso6391 === language).map((lang: any)=> lang.languageId)[0]
      }
      let languageId = this.languageService.languageMaps.filter((lang: any)=> lang.state === state).map((lang: any)=> lang.languageId)[0] || '1';
      this.city = userLocation.city;
      sessionStorage.setItem('userLocation', JSON.stringify(userLocation));
      this.getMobileHomeScreenData(userLocation, language, languageId);
    }
    this.dataService.isWhatsAppSubscribedObs.subscribe(value => {
      this.showWhatsAppCard = !value;
    })
    this.dataService.isWhatsAppResponseClosedObs.subscribe(value=>{
      this.closeWhatsAppResponseCard = value;
    })
  }

  public getMobileHomeScreenData(userLocation: any, language: any, languageId: any){
    
    this.spinnerUtil.showSpinner();
    this.dataService.getHomeScreenData(userLocation, languageId).pipe(
      catchError(err => {
        this.showErrorResponse = true
        return throwError(err)
      })
    ).subscribe(data => {
      this.apiResponseData = data;
      this.apiResponseData.articleListResponseBO.articleList = this.apiResponseData.articleListResponseBO.articleList.slice(0, 2);
      this.apiResponseData.govtSchemesList = this.apiResponseData.govtSchemesList.slice(0, 2);
      this.apiResponseData.weatherDetailsResponseBO.icon = this.apiResponseData.weatherDetailsResponseBO.icon.replace('nt_', '');
      sessionStorage.setItem('apiResponseData', JSON.stringify(this.apiResponseData));
      sessionStorage.setItem('language_ISO', language)
      this.spinnerUtil.hideSpinner();

      //get list of top crops
      this.dataService.topCrops = this.apiResponseData.commodityPricesMarketsDetailsBOList
        .map((commodity: { commodityName: any; }) => {
          if(!commodity)
            return
          return commodity.commodityName.toLowerCase()
        })

      this.weatherIcon = Constants.weather_icons[`${this.apiResponseData.weatherDetailsResponseBO.icon}`.toUpperCase()]
      this.weatherName = Constants.weather_names[`${this.apiResponseData.weatherDetailsResponseBO.icon}`.toUpperCase()]
      if(!this.apiResponseData.weatherDetailsResponseBO.icon)
        this.weatherIcon = Constants.weather_icons.WEATHER_ERROR;

      window.location.reload();
    })
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.showEnableLocation = false;
      })
    } 
  }

  subscribeWhatsapp() {
    if(!/^\d{10}$/.test(this.userPhoneNumber)){
      this.isPhoneNumberInvalid = true;
      return;
    }
    this.isPhoneNumberInvalid = false;
    let language_ISO = sessionStorage.getItem('language_ISO');
    let languageId = this.languageService.languages.filter((lang: any)=> lang.iso6391 === language_ISO).map((lang: any)=> lang.languageId)[0]
    this.dataService.saveWhatsAppSubscription({'userPhoneNumber': this.userPhoneNumber}, languageId).subscribe((response)=> {
      this.showWhatsAppCard = false;
      this.dataService.isWhatsAppSubscribed.next(true);
    })
  }

  closeWhatsAppResponse() {
    this.dataService.isWhatsAppResponseClosed.next(true);
    this.closeWhatsAppResponseCard = true
  }

  showExpertArticle(articleId: string) {
    this.router.navigate(['expert-article', articleId])
  }

  showCropMarketsPricing(crop: any) {
    this.router.navigate([`/market-pricing`, crop.commodityName,],)
  }

  showGovtSchemeDetail(scheme: any) {
    this.router.navigate(['/government-scheme', scheme.govtSchemeId])
  }

  downloadApp() {
    window.open(environment.appDownloadBannerDynamicLink, "appDownloadBannerDynamicLink")
  }

  openBottomSheet(){
    this.matBottomSheet.open(AppDownloadBottomSheetComponent)
  }

}