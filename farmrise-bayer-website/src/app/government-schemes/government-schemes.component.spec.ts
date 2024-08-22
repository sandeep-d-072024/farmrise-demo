import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GovernmentSchemesComponent } from './government-schemes.component';

describe('GovernmentSchemesComponent', () => {
  let component: GovernmentSchemesComponent;
  let fixture: ComponentFixture<GovernmentSchemesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GovernmentSchemesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GovernmentSchemesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
