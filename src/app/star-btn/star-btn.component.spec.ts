import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StarBtnComponent } from './star-btn.component';

describe('StarBtnComponent', () => {
  let component: StarBtnComponent;
  let fixture: ComponentFixture<StarBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StarBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StarBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
