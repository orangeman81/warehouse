import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { State } from 'src/app/reducers';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { mergeMap, map, tap, withLatestFrom, filter } from 'rxjs/operators';
import { IncomingCreated, IncomingUpdate, IncomingDeleteReq, IncomingDeleted, IncomingActionTypes, IncomingRequest, AllIncomingRequest, AllIncomingLoad, IncomingLoad, IncomingUpdated } from './incoming.actions';
import { Paginated } from '@feathersjs/feathers';
import { incomingLoaded } from './incoming.selectors';


@Injectable()
export class IncomingEffects {

  @Effect()
  createIncoming$ = this.actions$
    .pipe(
      ofType<IncomingCreated>(IncomingActionTypes.incomingCreated),
      mergeMap(action => this.api.$create('incoming', action.payload)),
      map(incoming => new IncomingLoad({ incoming })),
    );

  @Effect()
  updateIncoming$ = this.actions$
    .pipe(
      ofType<IncomingUpdate>(IncomingActionTypes.incomingUpdate),
      mergeMap(action => this.api.$update('incoming', action.payload.incoming)),
      map(() => new IncomingUpdated()),
      tap(() => this.router.navigate(['/incoming']))
    );

  @Effect()
  deleteIncoming$ = this.actions$
    .pipe(
      ofType<IncomingDeleteReq>(IncomingActionTypes.incomingDeleteReq),
      mergeMap(action => this.api.$delete('incoming', action.payload.incomingId)),
      map(incomingId => new IncomingDeleted({ incomingId: incomingId._id }))
    );

  @Effect()
  loadIncoming$ = this.actions$
    .pipe(
      ofType<IncomingRequest>(IncomingActionTypes.incomingRequest),
      mergeMap(action => this.api.$findOne('incoming', action.payload)),
      map(incoming => new IncomingLoad({ incoming }))
    );

  @Effect()
  loadAllincoming = this.actions$
    .pipe(
      ofType<AllIncomingRequest>(IncomingActionTypes.allIncomingRequest),
      withLatestFrom(this.store
        .pipe(
          select(incomingLoaded)
        )),
      filter(([action, incomingloaded]) => !incomingloaded),
      mergeMap(action =>
        this.api.$connect('incoming',
          {
            $sort: { createdAt: -1 },
            checked: false
          })
          .pipe(
            map((res: Paginated<any>) => res.data)
          )
      ),
      map(incoming => new AllIncomingLoad({ incoming }))
    )

  constructor(
    private actions$: Actions,
    private store: Store<State>,
    private api: ApiService,
    private router: Router
  ) { }

}
