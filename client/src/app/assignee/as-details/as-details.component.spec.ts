import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsDetailsComponent } from './as-details.component';

describe('AsDetailsComponent', () => {
  let component: AsDetailsComponent;
  let fixture: ComponentFixture<AsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
