import { Component, OnInit } from '@angular/core';
import { environment } from "../../environments/environment";
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-app-download',
  templateUrl: './app-download.component.html',
  styleUrls: ['./app-download.component.css']
})
export class AppDownloadComponent implements OnInit {

  constructor(private translateService: TranslateService){}

  defaultLanguage = 'en';

  ngOnInit(): void {
  }

  downloadApp(){
    window.open(environment.appDownloadBannerDynamicLink, "appDownloadBannerDynamicLink")
  }

}
