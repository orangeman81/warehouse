import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhListComponent } from './wh-list.component';

describe('WhListComponent', () => {
  let component: WhListComponent;
  let fixture: ComponentFixture<WhListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
