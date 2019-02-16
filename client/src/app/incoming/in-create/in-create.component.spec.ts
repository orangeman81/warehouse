import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InCreateComponent } from './in-create.component';

describe('InCreateComponent', () => {
  let component: InCreateComponent;
  let fixture: ComponentFixture<InCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
