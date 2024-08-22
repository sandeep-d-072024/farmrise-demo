import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-crop-doctor-info',
  templateUrl: './crop-doctor-info.component.html',
  styleUrls: ['./crop-doctor-info.component.css']
})
export class CropDoctorInfoComponent implements OnInit {

  defaultLanguage = 'en'
  detectedDevice = 'desktop';
  videoSrc = 'https://www.youtube.com/embed/k2ThNCz3mpE?rel=0'

  constructor(private translateService: TranslateService,
    private breakpointObserver: BreakpointObserver){}

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
  }
  
}
