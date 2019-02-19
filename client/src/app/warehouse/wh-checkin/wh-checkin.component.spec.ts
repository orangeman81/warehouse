import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhCheckinComponent } from './wh-checkin.component';

describe('WhCheckinComponent', () => {
  let component: WhCheckinComponent;
  let fixture: ComponentFixture<WhCheckinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhCheckinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhCheckinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
