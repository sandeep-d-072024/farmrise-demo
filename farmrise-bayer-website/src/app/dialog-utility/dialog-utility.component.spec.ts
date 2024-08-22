import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogUtilityComponent } from './dialog-utility.component';

describe('DialogUtilityComponent', () => {
  let component: DialogUtilityComponent;
  let fixture: ComponentFixture<DialogUtilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogUtilityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogUtilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
