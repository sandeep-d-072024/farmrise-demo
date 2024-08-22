import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LanguageSelectionComponent } from './language-selection.component';
import { LanguageService } from '../services/language.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import { of } from 'rxjs';

describe('LanguageSelectionComponent', () => {
  let component: LanguageSelectionComponent;
  let fixture: ComponentFixture<LanguageSelectionComponent>;
  let mockLanguageService: any;
  let mockTranslateService: any;
  let mockRouter: any;

  beforeEach(async () => {
    mockLanguageService = {
      languages: [{ iso6391: 'en', name: 'English' }, { iso6391: 'es', name: 'Spanish' }],
      getLanguageISO: jasmine.createSpy('getLanguageISO').and.returnValue('en'),
      setLanguageISO: jasmine.createSpy('setLanguageISO'),
      defaultSelectedLanguage: { next: jasmine.createSpy('next') },
      displayLangSelPopup: { next: jasmine.createSpy('next') },
      languageChange: { next: jasmine.createSpy('next') }
    };

    mockTranslateService = {
      use: jasmine.createSpy('use').and.returnValue(of({}))
    };

    mockRouter = {
      navigate: jasmine.createSpy('navigate')
    };

    await TestBed.configureTestingModule({
      declarations: [ LanguageSelectionComponent ],
      providers: [
        { provide: LanguageService, useValue: mockLanguageService },
        { provide: TranslateService, useValue: mockTranslateService },
        { provide: Router, useValue: mockRouter },
        { provide: BreakpointObserver, useValue: {} }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LanguageSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update language when a new language is selected', () => {
    component.onLanguageSelection('es');
    expect(mockTranslateService.use).toHaveBeenCalledWith('es');
    expect(mockLanguageService.setLanguageISO).toHaveBeenCalledWith('es');
    expect(mockLanguageService.defaultSelectedLanguage.next).toHaveBeenCalledWith('Spanish');
    expect(mockLanguageService.languageChange.next).toHaveBeenCalledWith(true);
  });

  it('should close the language selection popup', () => {
    component.closeLanguageSelectionPopup();
    expect(mockLanguageService.displayLangSelPopup.next).toHaveBeenCalledWith(false);
  });
});
