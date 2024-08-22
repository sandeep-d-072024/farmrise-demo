import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../services/language.service';
import { TranslateService } from '@ngx-translate/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router } from '@angular/router';

@Component({
  selector: 'app-language-selection',
  templateUrl: './language-selection.component.html',
  styleUrls: ['./language-selection.component.css']
})
export class LanguageSelectionComponent implements OnInit {

  languagesSubText = ["English", "Hindi", "Kannada", "Marathi", "Telugu", "Gujarati", "Odiya", "Punjabi", "Bangla", "Tamil"];
  languages: any[] = [];
  language_ISO: string = sessionStorage.getItem('language_ISO') ?? 'en';
  detectedDevice: string = 'desktop';

  defaultSelectedLanguage: string = this.language_ISO;

  constructor(
    private languageService: LanguageService,
    private translateService: TranslateService,
    private breakpointObserver: BreakpointObserver,
    private route: Router
  ) {
    this.breakpointObserver.observe(Breakpoints.HandsetPortrait).subscribe(screen => {
      this.detectedDevice = screen.matches ? 'mobile' : 'desktop';
    });
  }

  ngOnInit(): void {
    this.translateService.use(this.defaultSelectedLanguage);
    this.languages = this.languageService.languages;
  }

  closeLanguageSelectionPopup(): void {
    sessionStorage.setItem('language_ISO', this.languageService.getLanguageISO());
    this.languageService.displayLangSelPopup.next(false);
  }

  onLanguageSelection(selectedLanguageISO: string): void {
    if (this.languageService.getLanguageISO() !== selectedLanguageISO) {
      this.translateService.use(selectedLanguageISO);
      this.languageService.setLanguageISO(selectedLanguageISO);
      this.defaultSelectedLanguage = selectedLanguageISO;
      sessionStorage.setItem('language_ISO', selectedLanguageISO);

      const selectedLanguageName = this.languages.find(lang => lang.iso6391 === selectedLanguageISO)?.name || '';
      this.languageService.defaultSelectedLanguage.next(selectedLanguageName);
      this.languageService.languageChange.next(true);

      this.languageService.displayLangSelPopup.next(false);

      const languageId = this.languages.find(lang => lang.iso6391 === selectedLanguageISO)?.languageId;

      if (this.detectedDevice === 'mobile') {

        this.handleMobileSpecificLogic(languageId, selectedLanguageISO);
      } else {

        this.handleDesktopSpecificLogic(languageId, selectedLanguageISO);
      }

      if (this.route.url !== '/') {
        this.route.navigate(['/']);
      }
    }
  }

  handleMobileSpecificLogic(languageId: number | undefined, selectedLanguageISO: string): void {

    console.log('Mobile logic for language change: ', languageId, selectedLanguageISO);

  }

  handleDesktopSpecificLogic(languageId: number | undefined, selectedLanguageISO: string): void {

    console.log('Desktop logic for language change: ', languageId, selectedLanguageISO);

  }
}
