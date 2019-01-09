import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhDetailsComponent } from './wh-details.component';

describe('WhDetailsComponent', () => {
  let component: WhDetailsComponent;
  let fixture: ComponentFixture<WhDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
