import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsAssignComponent } from './as-assign.component';

describe('AsAssignComponent', () => {
  let component: AsAssignComponent;
  let fixture: ComponentFixture<AsAssignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsAssignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
