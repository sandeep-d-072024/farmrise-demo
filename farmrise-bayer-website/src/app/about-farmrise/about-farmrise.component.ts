import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'
import { CdkAccordionModule, CdkAccordion, CdkAccordionItem } from '@angular/cdk/accordion';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from "../../environments/environment";
import { DataService } from '../services/data.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-about-farmrise',
  templateUrl: './about-farmrise.component.html',
  styleUrls: ['./about-farmrise.component.css']
})
export class AboutFarmriseComponent implements OnInit {

  detectedDevice = 'desktop';
  defaultLanguage = 'en';
  userFeedbackForm = new FormGroup({
    userName: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern('\\d{10}'), Validators.maxLength(10)]),
    comment: new FormControl('', [Validators.required]),
    recaptchaCheck: new FormControl('', [Validators.required])
  })
  showFeedbackSuccess = false;
  videoSrc = 'https://www.youtube.com/embed/7Nh2SUrQvrU?playlist=7Nh2SUrQvrU&loop=1;rel=0&autoplay=1'
  siteKey: string = environment.recaptchaSiteKey;

  constructor(private breakpointObserver: BreakpointObserver, private dataService: DataService,
              private translateService: TranslateService ) { }

  aboutFarmRiseFeaturesData = [
    {
      featureName: "agronomy_advisory",
      featureDescription: "agronomy_advisory_description"
    },
    {
      featureName: "mandi_prices",
      featureDescription: "mandi_prices_description"
    },
    {
      featureName: "weather",
      featureDescription: "weather_description"
    },
    {
      featureName: "expert_articles",
      featureDescription: "expert_articles_description"
    },
    {
      featureName: "news_events",
      featureDescription: "news_events_description"
    },
    {
      featureName: "locate_my_farm",
      featureDescription: "locate_my_farm_description"
    }

  ]

  ngOnInit(): void {
    this.breakpointObserver.observe(Breakpoints.HandsetPortrait)
      .subscribe(screen => {
        if (screen.matches) {
          this.detectedDevice = 'mobile'
        }
        else {
          this.detectedDevice = 'desktop'
        }
      })
    this.translateService.use(sessionStorage.getItem('language_ISO')!);
    this.dataService.isFeedBackSubmittedObs.subscribe(value => {
      this.showFeedbackSuccess = value
    })
  }

  submitFeedback() {    
    if (this.userFeedbackForm.valid) {
      this.dataService.saveUserFeedback(this.userFeedbackForm.value).subscribe((data)=>{
        this.showFeedbackSuccess = true;
        this.dataService.isFeedBackSubmitted.next(true);
      })
    }
  }
}
