import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyProductsInfoComponent } from './verify-products-info.component';

describe('VerifyProductsInfoComponent', () => {
  let component: VerifyProductsInfoComponent;
  let fixture: ComponentFixture<VerifyProductsInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifyProductsInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifyProductsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
