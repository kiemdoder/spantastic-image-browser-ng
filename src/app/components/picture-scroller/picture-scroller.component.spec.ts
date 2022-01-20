import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PictureScrollerComponent } from './picture-scroller.component';

describe('PictureScrollerComponent', () => {
  let component: PictureScrollerComponent;
  let fixture: ComponentFixture<PictureScrollerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PictureScrollerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PictureScrollerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
