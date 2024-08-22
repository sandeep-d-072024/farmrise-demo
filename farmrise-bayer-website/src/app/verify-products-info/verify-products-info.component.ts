import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-verify-products-info',
  templateUrl: './verify-products-info.component.html',
  styleUrls: ['./verify-products-info.component.css']
})
export class VerifyProductsInfoComponent implements OnInit{

  defaultLanguage = 'en';
  detectedDevice = 'desktop';
  selectedLanguage: string = sessionStorage.getItem('language_ISO')!;
  videoSrc = 'https://www.youtube.com/embed/vWwSryO72k0?rel=0';
  videolinks = {
      hi: 'https://www.youtube.com/embed/vWwSryO72k0?rel=0',
      mr: 'https://www.youtube.com/embed/CJMRGX-pOQU?rel=0',
      gu: 'https://www.youtube.com/embed/m4nx32kLWIM?rel=0',
      te: 'https://www.youtube.com/embed/kXdvgP-ExLw?rel=0',
      kn: 'https://www.youtube.com/embed/PgF9UUTIR1I?rel=0',
      ta: 'https://www.youtube.com/embed/FeTIVLbFRzM?rel=0'
  }

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
      switch (this.selectedLanguage) {
        case 'hi' || 'en' || 'pa' || 'or' || 'bn':
          this.videoSrc = this.videolinks.hi;
          break;
        case 'mr':
          this.videoSrc = this.videolinks.mr
          break;
        case 'gu':
          this.videoSrc = this.videolinks.gu
          break;
        case 'te':
          this.videoSrc = this.videolinks.te
          break;
        case 'kn':
          this.videoSrc = this.videolinks.kn
          break;
        case 'ta':
          this.videoSrc = this.videolinks.ta
          break;
        default:
          break;
      }
  }

}
