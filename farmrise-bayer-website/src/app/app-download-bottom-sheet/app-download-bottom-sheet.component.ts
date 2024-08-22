import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet'
import { DataService } from '../services/data.service';
import { environment } from 'src/environments/environment';
import { LanguageService } from '../services/language.service';
import { style } from '@angular/animations';

@Component({
  selector: 'app-app-download-bottom-sheet',
  templateUrl: './app-download-bottom-sheet.component.html',
  styleUrls: ['./app-download-bottom-sheet.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppDownloadBottomSheetComponent implements OnInit{

  selectedLanguage = 'en'
  closeBottomSheet: boolean = false;
  constructor(private matBottomSheet: MatBottomSheet, private languageService: LanguageService,
    ) {
    this.selectedLanguage = languageService.getLanguageISO();
   }

  ngOnInit(): void {
  }

  bottomSheetCarouselContents = [
    {
      img: '../../assets/img_app_download.png',
      description: 'to_know_product_scanned_is_genuine',
      backgroundColor: '',
      style: 'position:relative; top:0px; left:0px; width:100%; height:350px; background-repeat: no-repeat; background-size: 100%;'
    },
    {
      img: '../../assets/bottom_sheet_img2.png',
      description: 'discover_farm_events_nationwide',
      backgroundColor: '#E3F2E8',
      style: 'width: 100%; position: relative; margin-top: 51%;'
    },
    {
      img: '../../assets/bottom_sheet_img3.png',
      description: 'send_pictures_we_find_solution',
      backgroundColor: '#E3F2E8',
      style: 'width: 100%; position: relative; margin-top: 51%;'
    }
  ]

  closeDownloadBottomSheet() {
    this.matBottomSheet.dismiss();
    this.closeBottomSheet = true;
    window.location.reload()
  }

  public downloadApp() {
    this.matBottomSheet.dismiss()
    this.closeBottomSheet = true;
    window.open(environment.appDownloadPopupDynamicLink, "appDownloadPopupDynamicLink");
    window.location.reload()
  }

}


