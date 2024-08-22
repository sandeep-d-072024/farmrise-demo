import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CropDoctorInfoComponent } from './crop-doctor-info.component';

describe('CropDoctorInfoComponent', () => {
  let component: CropDoctorInfoComponent;
  let fixture: ComponentFixture<CropDoctorInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CropDoctorInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CropDoctorInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
