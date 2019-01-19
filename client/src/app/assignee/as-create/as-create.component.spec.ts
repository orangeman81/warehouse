import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsCreateComponent } from './as-create.component';

describe('AsCreateComponent', () => {
  let component: AsCreateComponent;
  let fixture: ComponentFixture<AsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
