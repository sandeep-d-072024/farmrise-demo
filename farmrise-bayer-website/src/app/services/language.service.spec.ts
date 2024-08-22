import { TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { LanguageService } from './language.service';

describe('LanguageService', () => {
  let service: LanguageService;
  let translateService: jasmine.SpyObj<TranslateService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('TranslateService', ['use', 'get']);

    TestBed.configureTestingModule({
      providers: [
        LanguageService,
        { provide: TranslateService, useValue: spy }
      ]
    });

    service = TestBed.inject(LanguageService);
    translateService = TestBed.inject(TranslateService) as jasmine.SpyObj<TranslateService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set language and notify subscribers', () => {
    const languageISO = 'fr';
    service.setLanguageISO(languageISO);
    expect(service.getLanguageISO()).toBe(languageISO);
    expect(translateService.use).toHaveBeenCalledWith(languageISO);
    service.languageChangeObs.subscribe(change => {
      expect(change).toBeTrue();
    });
  });
});
