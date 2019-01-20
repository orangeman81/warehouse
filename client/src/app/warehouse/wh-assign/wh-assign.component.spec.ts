import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhAssignComponent } from './wh-assign.component';

describe('WhAssignComponent', () => {
  let component: WhAssignComponent;
  let fixture: ComponentFixture<WhAssignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhAssignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
