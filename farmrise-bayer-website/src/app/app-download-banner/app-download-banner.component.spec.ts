import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppDownloadBannerComponent } from './app-download-banner.component';

describe('AppDownloadBannerComponent', () => {
  let component: AppDownloadBannerComponent;
  let fixture: ComponentFixture<AppDownloadBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppDownloadBannerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppDownloadBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
