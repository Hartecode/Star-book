import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StarBundleComponent } from './star-bundle.component';

describe('StarBundleComponent', () => {
  let component: StarBundleComponent;
  let fixture: ComponentFixture<StarBundleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StarBundleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StarBundleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
