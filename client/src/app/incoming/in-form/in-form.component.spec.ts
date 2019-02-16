import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InFormComponent } from './in-form.component';

describe('InFormComponent', () => {
  let component: InFormComponent;
  let fixture: ComponentFixture<InFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
