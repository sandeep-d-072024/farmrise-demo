import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertArticlesComponent } from './expert-articles.component';

describe('ExpertArticlesComponent', () => {
  let component: ExpertArticlesComponent;
  let fixture: ComponentFixture<ExpertArticlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpertArticlesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpertArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
