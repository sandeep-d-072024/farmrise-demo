import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'
import { TranslateService } from '@ngx-translate/core';
import { environment } from "../../environments/environment";
import { DataService } from '../services/data.service';
import { SpinnerUtils } from '../utils/spinner.util';

@Component({
  selector: 'app-latest-news',
  templateUrl: './latest-news.component.html',
  styleUrls: ['./latest-news.component.css']
})
export class LatestNewsComponent implements OnInit {

  detectedDevice = 'desktop';
  defaultLanguage = 'en'
  newsList: any = [
    {
      newsId: '',
      url: '',
      heading: '',
      newsDate: '',
      isNew: '',
      isRead: null
    }
  ];

  constructor(private breakpointObserver: BreakpointObserver, private translateService: TranslateService,
    private dataService: DataService, private spinnerUtil: SpinnerUtils) {
   }

  ngOnInit(): void {
    this.breakpointObserver.observe(Breakpoints.HandsetPortrait)
      .subscribe(screen => {
        if (screen.matches){
          this.detectedDevice = 'mobile';
        }
        else{
          this.detectedDevice = 'desktop';
        }  
      })
      this.spinnerUtil.showSpinner();
      this.translateService.use(sessionStorage.getItem('language_ISO')!);
      let userLocation = JSON.parse(sessionStorage.getItem('userLocation')!);
      this.dataService.getNewsList(userLocation.languageId, userLocation.state).subscribe(data=>{
        this.newsList = data;
        this.spinnerUtil.hideSpinner();
      })
  }

  downloadApp(){
    window.open(environment.appDownloadBannerDynamicLink, "appDownloadBannerDynamicLink")
  }

}
