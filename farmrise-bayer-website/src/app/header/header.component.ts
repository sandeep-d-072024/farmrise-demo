import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../services/language.service';
import { environment } from "../../environments/environment";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  desktopView: boolean = false;
  mobileView: boolean = false;
  mobileViewMenu = false;

  selectedLanguageISO: string = '';
  selectedLanguageName: string = '';

  constructor(private languageService: LanguageService) {
    this.updateView(window.screen.width > 916);
    this.languageService.defaultSelectedLanguageObs.subscribe(value => {
      this.updateSelectedLanguage(value);
    });
  }

  ngOnInit(): void {
    // Add a listener for window resize if you want to handle dynamic changes
    window.addEventListener('resize', () => {
      this.updateView(window.screen.width > 916);
    });

    this.updateSelectedLanguage(this.languageService.getLanguageISO()); // Initialize the selected language
  }

  private updateView(isDesktop: boolean) {
    this.desktopView = isDesktop;
    this.mobileView = !isDesktop;
  }

  private updateSelectedLanguage(value: string | null) {
    if (!value) {
      this.selectedLanguageISO = sessionStorage.getItem('language_ISO') || '';
      this.selectedLanguageName = this.languageService.languages.find((lang: any) => lang.iso6391 === this.selectedLanguageISO)?.name || '';
    } else {
      this.selectedLanguageName = value;
      this.selectedLanguageISO = this.languageService.languages.find((lang: any) => lang.name === value)?.iso6391.toUpperCase() || '';
    }
  }

  showMobileMenu() {
    this.mobileViewMenu = !this.mobileViewMenu;
  }

  showLanguageSelectionPopup() {
    this.languageService.displayLangSelPopup.next(true);
  }

  openCareersPage() {
    window.open(environment.careers);
  }
}
