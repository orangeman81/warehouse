import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsFormComponent } from './as-form.component';

describe('AsFormComponent', () => {
  let component: AsFormComponent;
  let fixture: ComponentFixture<AsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
