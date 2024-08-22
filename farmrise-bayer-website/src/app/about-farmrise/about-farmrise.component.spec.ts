import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutFarmriseComponent } from './about-farmrise.component';

describe('AboutFarmriseComponent', () => {
  let component: AboutFarmriseComponent;
  let fixture: ComponentFixture<AboutFarmriseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutFarmriseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutFarmriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
