import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketPricingComponent } from './market-pricing.component';

describe('MarketPricingComponent', () => {
  let component: MarketPricingComponent;
  let fixture: ComponentFixture<MarketPricingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarketPricingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketPricingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
