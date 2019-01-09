import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhCreateComponent } from './wh-create.component';

describe('WhCreateComponent', () => {
  let component: WhCreateComponent;
  let fixture: ComponentFixture<WhCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
