import { Component, OnInit } from '@angular/core';
import { environment } from "../../environments/environment";
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-app-download-banner',
  templateUrl: './app-download-banner.component.html',
  styleUrls: ['./app-download-banner.component.css']
})
export class AppDownloadBannerComponent implements OnInit{

  constructor(private translateService: TranslateService) { }

  // defaultLanguage = 'en';

  ngOnInit(): void {
  }

  appDownload() {
    window.open(environment.appDownloadBannerDynamicLink, "appDownloadBannerDynamicLink")
  }

}
