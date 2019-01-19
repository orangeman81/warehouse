import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsListComponent } from './as-list.component';

describe('AsListComponent', () => {
  let component: AsListComponent;
  let fixture: ComponentFixture<AsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
