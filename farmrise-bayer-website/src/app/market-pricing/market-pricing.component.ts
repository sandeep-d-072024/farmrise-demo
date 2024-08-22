import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { DataService } from '../services/data.service';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-market-pricing',
  templateUrl: './market-pricing.component.html',
  styleUrls: ['./market-pricing.component.css']
})
export class MarketPricingComponent implements OnInit {
  showWhatsAppCard = true;
  detectedDevice = 'desktop';
  selectedLanguage = 'en';
  selectedCrop = '';
  selectedCropIndex = 0;
  commodityPriceMarketBoList: any[] = [];
  topCrops: any[] = [];
  closeWhatsAppResponseCard: boolean = false;

  @Input() userPhoneNumber!: string;
  isPhoneNumberInvalid: boolean = false;

  constructor(
    private translateService: TranslateService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private breakpointObserver: BreakpointObserver,
    private dataService: DataService,
    private languageService: LanguageService
  ) {}

  ngOnInit(): void {
    // Device detection
    this.breakpointObserver.observe(Breakpoints.HandsetPortrait)
      .subscribe(screen => {
        this.detectedDevice = screen.matches ? 'mobile' : 'desktop';
      });

    // Initialization logic
    this.selectedCrop = this.activatedRoute.snapshot.params['cropName'].toLowerCase();
    const apiResponseData = sessionStorage.getItem('apiResponseData');
    if (apiResponseData) {
      this.commodityPriceMarketBoList = JSON.parse(apiResponseData).commodityPricesMarketsDetailsBOList;
      this.topCrops = this.commodityPriceMarketBoList.map((commodity: { commodityName: any }) => commodity.commodityName.toLowerCase());
      this.selectedCropIndex = this.topCrops.indexOf(this.selectedCrop);
    }

    // Subscription to data service observables
    this.dataService.isWhatsAppSubscribedObs.subscribe(value => {
      this.showWhatsAppCard = !value;
    });
    this.dataService.isWhatsAppResponseClosedObs.subscribe(value => {
      this.closeWhatsAppResponseCard = value;
    });
  }

  getDate(date: string | number | Date): number {
    return !date ? new Date().getDate() : new Date(date).getDate();
  }

  subscribeWhatsapp(): void {
    if (!/^\d{10}$/.test(this.userPhoneNumber)) {
      this.isPhoneNumberInvalid = true;
      return;
    }
    this.isPhoneNumberInvalid = false;
    const language_ISO = sessionStorage.getItem('language_ISO');
    const languageId = this.languageService.languages.find((lang: any) => lang.iso6391 === language_ISO)?.languageId;
    if (languageId) {
      this.dataService.saveWhatsAppSubscription({ userPhoneNumber: this.userPhoneNumber }, languageId).subscribe(() => {
        this.showWhatsAppCard = false;
        this.dataService.isWhatsAppSubscribed.next(true);
      });
    }
  }

  closeWhatsAppResponse(): void {
    this.dataService.isWhatsAppResponseClosed.next(true);
    this.closeWhatsAppResponseCard = true;
  }

  showSelectedCropMarkets(cropName: string): void {
    this.selectedCrop = cropName.toLowerCase();
    this.selectedCropIndex = this.topCrops.indexOf(this.selectedCrop);
    this.router.navigate([`/market-pricing`, cropName]);
  }
}
