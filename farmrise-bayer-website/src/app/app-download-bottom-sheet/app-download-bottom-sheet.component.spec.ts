import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppDownloadBottomSheetComponent } from './app-download-bottom-sheet.component';

describe('AppDownloadBottomSheetComponent', () => {
  let component: AppDownloadBottomSheetComponent;
  let fixture: ComponentFixture<AppDownloadBottomSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppDownloadBottomSheetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppDownloadBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
