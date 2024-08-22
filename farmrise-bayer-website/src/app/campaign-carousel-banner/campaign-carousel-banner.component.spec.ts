import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignCarouselBannerComponent } from './campaign-carousel-banner.component';

describe('CampaignCarouselBannerComponent', () => {
  let component: CampaignCarouselBannerComponent;
  let fixture: ComponentFixture<CampaignCarouselBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaignCarouselBannerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampaignCarouselBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
