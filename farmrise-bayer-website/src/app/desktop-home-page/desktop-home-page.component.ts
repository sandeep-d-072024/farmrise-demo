import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CarouselComponent, CarouselIndicatorsComponent } from "@coreui/angular";
import { DataService } from '../services/data.service';
import { catchError, throwError } from 'rxjs';
import { SpinnerUtils } from "../utils/spinner.util";
import { NgxSpinnerService } from "ngx-spinner";
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from "../../environments/environment";
import { LanguageService } from '../services/language.service';
import { Constants } from "../constants/constants";

@Component({
  selector: 'app-desktop-home-page',
  templateUrl: './desktop-home-page.component.html',
  styleUrls: ['./desktop-home-page.component.scss']
})
export class DesktopHomePageComponent implements OnInit {

  userLocation = '';
  showWhatsAppCard = true;
  commodityPriceMarketBoList: any[] = [];
  apiResponseData: any;
  showEnableLocation: boolean = true;
  showErrorResponse: boolean = false;
  weatherIcon: any;
  weatherName: any;
  city: any = sessionStorage.getItem('userLocation') != null ? JSON.parse(sessionStorage.getItem('userLocation')!).city : '';
  closeWhatsAppResponseCard: boolean = false

  @Input()
  userPhoneNumber!: string;
  isPhoneNumberInvalid: boolean = false;

  constructor(private translateService: TranslateService, private dataService: DataService,
    private spinnerUtil: SpinnerUtils, private spinner: NgxSpinnerService,
    private router: Router, private activatedRoute: ActivatedRoute,
    private languageService: LanguageService,
    ) {}

  carouselBannerData = [
    {
      title: "A Robust, Innovative most advanced tool for farmers",
      subtitle: "We help farmers and their farms yield crops more by providing end to end crop solutions.",
      img: "../../assets/banner_description.png"
    },
    {
      title: "A Robust, Innovative most advanced tool for farmers",
      subtitle: "We help farmers and their farms yield crops more by providing end to end crop solutions.",
      img: "../../assets/banner_description.png"
    },
    {
      title: "A Robust, Innovative most advanced tool for farmers",
      subtitle: "We help farmers and their farms yield crops more by providing end to end crop solutions.",
      img: "../../assets/banner_description.png"
    },
    {
      title: "A Robust, Innovative most advanced tool for farmers",
      subtitle: "We help farmers and their farms yield crops more by providing end to end crop solutions.",
      img: "../../assets/banner_description.png"
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
      this.commodityPriceMarketBoList = this.apiResponseData.commodityPricesMarketsDetailsBOList;
      this.apiResponseData.weatherDetailsResponseBO.icon = this.apiResponseData.weatherDetailsResponseBO.icon.replace('nt_', '');
      this.weatherIcon = Constants.weather_icons[`${this.apiResponseData.weatherDetailsResponseBO.icon}`.toUpperCase()]
      this.weatherName = Constants.weather_names[`${this.apiResponseData.weatherDetailsResponseBO.icon}`.toUpperCase()]
    }
    else {
      this.spinner.show()
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
      let languageId = this.languageService.languageMaps.filter((lang: any)=> lang.state === state).map((lang: any)=> lang.languageId)[0] || '1'
      this.city = userLocation.city;
      sessionStorage.setItem('userLocation', JSON.stringify(userLocation));
      sessionStorage.setItem('language_ISO', language)
      this.languageService.defaultSelectedLanguage.next(this.languageService.languages.filter((lang: any)=> lang.iso6391 === language).map((lang: any)=> lang.name)[0])
      this.getDesktopHomeScreenData(userLocation, language, languageId);
      this.dataService.isWhatsAppSubscribedObs.subscribe(value => {
        this.showWhatsAppCard = !value;
      })
      this.dataService.isWhatsAppResponseClosedObs.subscribe(value => {
        this.closeWhatsAppResponseCard = value
      })
  }
  }

  public getDesktopHomeScreenData(userLocation: any, language: any, languageId: any){
    this.dataService.getHomeScreenData(userLocation, languageId).pipe(
      catchError(err => {
        this.showErrorResponse = true
        return throwError(err)
      })
    ).subscribe(async data => {
      this.apiResponseData = data;
      this.apiResponseData.articleListResponseBO.articleList = this.apiResponseData.articleListResponseBO.articleList.slice(0, 2)
      sessionStorage.setItem('apiResponseData', JSON.stringify(this.apiResponseData));
      sessionStorage.setItem('language_ISO', language)
      this.spinner.hide();
      this.commodityPriceMarketBoList = this.apiResponseData.commodityPricesMarketsDetailsBOList;
      this.apiResponseData.weatherDetailsResponseBO.icon = this.apiResponseData.weatherDetailsResponseBO.icon.replace('nt_', '');
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

  getDate(date: string | number | Date) {
    if (!date)
      return new Date().getDate();
    return new Date(date).getDate();
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

  showGovtSchemeDetail(schemeId: string) {
    this.router.navigate(['/government-scheme', schemeId])
  }

  downloadApp() {
    window.open(environment.appDownloadBannerDynamicLink, "appDownloadBannerDynamicLink")
  }

}