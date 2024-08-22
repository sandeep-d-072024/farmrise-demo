import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-campaign-carousel-banner',
  templateUrl: './campaign-carousel-banner.component.html',
  styleUrls: ['./campaign-carousel-banner.component.css']
})
export class CampaignCarouselBannerComponent implements OnInit {

  detectedDevice = 'mobile';
  campaignBannersData: any[] = [];

  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver.observe(Breakpoints.HandsetPortrait)
      .subscribe(screen => {
        if (screen.matches) {
          this.detectedDevice = 'mobile'
        }
        else {
          this.detectedDevice = 'desktop'
        }

        this.campaignBannersData = [
          {
            bannerTitle: 'check_product_authenticity', 
            bannerDescription: this.detectedDevice === 'mobile' ? 'scan_product_know_authenticity' : 'scan_product_know_authenticity_desktop',
            bannerBackground: this.detectedDevice === 'mobile' ? '../../assets/mobile_banner_1_background.webp' : '../../assets/desktop_banner_1_background.png',
          },
          {
            bannerTitle: 'having_crop_problems',
            bannerDescription: this.detectedDevice === 'mobile' ? 'send_pictures_we_find_solution' : 'send_pictures_we_find_solution_desktop',
            bannerBackground: this.detectedDevice === 'mobile' ? '../../assets/mobile_banner_2_background.webp' : '../../assets/desktop_banner_2_background.png',
          },
          {
            bannerTitle: 'discover_events',
            bannerDescription: this.detectedDevice === 'mobile' ? 'discover_farm_events_nationwide' : 'discover_farm_events_nationwide_desktop',
            bannerBackground: this.detectedDevice === 'mobile' ? '../../assets/mobile_banner_3_background.png' : '../../assets/desktop_banner_3_background.png'
          },
        ]
      });
  }

  ngOnInit(): void {}

  appDownload() {
    window.open(environment.appDownloadBannerDynamicLink, "appDownloadBannerDynamicLink")
  }

}
