import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { IncomingEffects } from './incoming.effects';

describe('IncomingEffects', () => {
  let actions$: Observable<any>;
  let effects: IncomingEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        IncomingEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(IncomingEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
