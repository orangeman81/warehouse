import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InListComponent } from './in-list.component';

describe('InListComponent', () => {
  let component: InListComponent;
  let fixture: ComponentFixture<InListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
