import { Component, OnDestroy, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { catchError, throwError } from 'rxjs';
import { SpinnerUtils } from '../utils/spinner.util';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-government-schemes',
  templateUrl: './government-schemes.component.html',
  styleUrls: ['./government-schemes.component.css']
})
export class GovernmentSchemesComponent implements OnInit, OnDestroy {

  detectedDevice = 'desktop';
  schemeId: string = '';
  showErrorResponse: boolean = false;
  govtSchemeApiResponse: any;

  constructor(private breakpointObserver: BreakpointObserver,
    private translateService: TranslateService, private activatedRoute: ActivatedRoute,
    private dataService: DataService, private spinnerUtil: SpinnerUtils) {
  }

  ngOnInit(): void {
    this.breakpointObserver.observe(Breakpoints.Handset)
      .subscribe(screen => {
        if (screen.matches) {
          this.detectedDevice = 'mobile'
        }
        else {
          this.detectedDevice = 'desktop'
        }
      })
      this.translateService.use(sessionStorage.getItem('language_ISO')!);
      if(sessionStorage.getItem('govtSchemeApiResponse')){
        this.govtSchemeApiResponse = JSON.parse(sessionStorage.getItem('govtSchemeApiResponse')!);
        return;
      }
      this.spinnerUtil.showSpinner();
      let userLocation = JSON.parse(sessionStorage.getItem('userLocation')!);
      this.schemeId = this.activatedRoute.snapshot.params['schemeId'];
      this.dataService.getGovtScheme(this.schemeId, userLocation.languageId, userLocation.state).pipe(
        catchError(err => {
          this.showErrorResponse = true;
          return throwError(err)
        })).subscribe(async(data) =>{
          this.govtSchemeApiResponse = data;
          sessionStorage.setItem('govtSchemeApiResponse', JSON.stringify(this.govtSchemeApiResponse))
          this.spinnerUtil.hideSpinner();
        })
  }

  downloadApp() {
    window.open(environment.appDownloadBannerDynamicLink, "appDownloadBannerDynamicLink")
  }

  ngOnDestroy(): void {
    sessionStorage.removeItem('govtSchemeApiResponse')
  }

}
