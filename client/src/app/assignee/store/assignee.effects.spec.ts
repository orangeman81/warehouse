import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { AssigneeEffects } from './assignee.effects';

describe('AssigneeEffects', () => {
  let actions$: Observable<any>;
  let effects: AssigneeEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AssigneeEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(AssigneeEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
