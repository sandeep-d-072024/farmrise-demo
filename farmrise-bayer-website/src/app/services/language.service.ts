import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  languages: any;
  languageISO: string = 'en'; // Default to 'en'
  languageMaps: any;

  displayLangSelPopup = new BehaviorSubject<boolean>(false);
  displayLangSelPopupObs = this.displayLangSelPopup.asObservable();

  defaultSelectedLanguage = new BehaviorSubject<string>('');
  defaultSelectedLanguageObs = this.defaultSelectedLanguage.asObservable();

  languageChange = new BehaviorSubject<boolean>(false);
  languageChangeObs = this.languageChange.asObservable();

  constructor(private translateService: TranslateService) {
    this.languages = [
      { languageId: 1, name: 'English', iso6391: 'en' },
      { languageId: 2, name: 'हिंदी', iso6391: 'hi' },
      { languageId: 3, name: 'ಕನ್ನಡ', iso6391: 'kn' },
      { languageId: 4, name: 'मराठी', iso6391: 'mr' },
      { languageId: 5, name: 'తెలుగు', iso6391: 'te' },
      { languageId: 6, name: 'ગુજરાતી', iso6391: 'gu' },
      { languageId: 7, name: 'ଓଡିଆ', iso6391: 'or' },
      { languageId: 8, name: 'ਪੰਜਾਬੀ', iso6391: 'pa' },
      { languageId: 9, name: 'বাংলা', iso6391: 'bn' },
      { languageId: 10, name: 'தமிழ்', iso6391: 'ta' }
    ];

    this.languageMaps = [
      { state: "AP", languageId: 5, iso6391: 'te' },
      { state: "AR", languageId: 2, iso6391: 'hi' },
      { state: "AS", languageId: 2, iso6391: 'hi' },
      { state: "BR", languageId: 2, iso6391: 'hi' },
      { state: "CG", languageId: 2, iso6391: 'hi' },
      { state: "DL", languageId: 2, iso6391: 'hi' },
      { state: "GA", languageId: 4, iso6391: 'mr' },
      { state: "GJ", languageId: 6, iso6391: 'gu' },
      { state: "HR", languageId: 2, iso6391: 'hi' },
      { state: "HP", languageId: 2, iso6391: 'hi' },
      { state: "JK", languageId: 1, iso6391: 'en' },
      { state: "JH", languageId: 2, iso6391: 'hi' },
      { state: "KA", languageId: 3, iso6391: 'kn' },
      { state: "KL", languageId: 1, iso6391: 'en' },
      { state: "LD", languageId: 1, iso6391: 'en' },
      { state: "MP", languageId: 2, iso6391: 'hi' },
      { state: "MH", languageId: 4, iso6391: 'mr' },
      { state: "MN", languageId: 1, iso6391: 'en' },
      { state: "ML", languageId: 1, iso6391: 'en' },
      { state: "MZ", languageId: 1, iso6391: 'en' },
      { state: "NL", languageId: 1, iso6391: 'en' },
      { state: "OR", languageId: 7, iso6391: 'or' },
      { state: "PY", languageId: 10, iso6391: 'ta' },
      { state: "PB", languageId: 8, iso6391: 'pa' },
      { state: "RJ", languageId: 2, iso6391: 'hi' },
      { state: "SK", languageId: 1, iso6391: 'en' },
      { state: "TN", languageId: 10, iso6391: 'ta' },
      { state: "TS", languageId: 5, iso6391: 'te' },
      { state: "TR", languageId: 1, iso6391: 'en' },
      { state: "UP", languageId: 2, iso6391: 'hi' },
      { state: "UK", languageId: 2, iso6391: 'hi' },
      { state: "WB", languageId: 9, iso6391: 'bn' },
    ];

    this.translateService.use(this.languageISO);
  }

  setLanguageISO(languageISO: string) {
    this.languageISO = languageISO;
    this.translateService.use(languageISO); // Change language in TranslateService
    this.languageChange.next(true); // Notify subscribers about the language change
  }

  getLanguageISO(): string {
    return this.languageISO;
  }
}
