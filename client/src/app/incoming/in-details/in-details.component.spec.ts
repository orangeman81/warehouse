import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InDetailsComponent } from './in-details.component';

describe('InDetailsComponent', () => {
  let component: InDetailsComponent;
  let fixture: ComponentFixture<InDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
