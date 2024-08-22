import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesktopHomePageComponent } from './desktop-home-page.component';

describe('DesktopHomePageComponent', () => {
  let component: DesktopHomePageComponent;
  let fixture: ComponentFixture<DesktopHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesktopHomePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesktopHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
