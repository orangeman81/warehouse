import { Paginated } from '@feathersjs/feathers';
import { State } from './../../reducers/index';
import { Router } from '@angular/router';
import { AssigneeUpdated, AssigneeCreated, AssigneeActionTypes, AssigneeLoad, AssigneeDeleteReq, AssigneeDeleted, AssigneeRequest, AssigneesLoad, AssigneesRequest, AssigneeUpdate } from './assignee.actions';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { filter, mergeMap, map, tap, withLatestFrom } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { AssigneesLoaded } from './assignee.selectors';
import { ApiService } from 'src/app/services/api.service';


@Injectable()
export class AssigneeEffects {

  @Effect()
  createassignee$ = this.actions$
    .pipe(
      ofType<AssigneeCreated>(AssigneeActionTypes.AssigneeCreated),
      mergeMap(action => this.api.$create('assignees', action.payload)),
      map(assignee => new AssigneeLoad({ assignee })),
      tap(() => this.router.navigate(['/assignee']))
    );

  @Effect()
  updateassignee$ = this.actions$
    .pipe(
      ofType<AssigneeUpdate>(AssigneeActionTypes.AssigneeUpdate),
      mergeMap(action => this.api.$update('assignees', action.payload.assignee)),
      map(() => new AssigneeUpdated()),
      tap(() => this.router.navigate(['/assignee']))
    );

  @Effect()
  deleteassignee$ = this.actions$
    .pipe(
      ofType<AssigneeDeleteReq>(AssigneeActionTypes.AssigneeDeleteReq),
      mergeMap(action => this.api.$delete('assignees', action.payload.assigneeId)),
      map(assigneeId => new AssigneeDeleted({ assigneeId: assigneeId._id })),
      tap(() => this.router.navigate(['/assignee']))
    );

  @Effect()
  loadassignee$ = this.actions$
    .pipe(
      ofType<AssigneeRequest>(AssigneeActionTypes.AssigneeRequest),
      mergeMap(action => this.api.$findOne('assignees', action.payload)),
      map(assignee => new AssigneeLoad({ assignee }))
    );

  @Effect()
  loadAssignees$ = this.actions$
    .pipe(
      ofType<AssigneesRequest>(AssigneeActionTypes.AssigneesRequest),
      withLatestFrom(this.store
        .pipe(
          select(AssigneesLoaded)
        )),
      filter(([action, assigneesloaded]) => !assigneesloaded),
      mergeMap(action =>
        this.api.$connect('assignees')
          .pipe(
            map((res: Paginated<any>) => res.data)
          )
      ),
      map(assignees => new AssigneesLoad({ assignees }))
    )

  constructor(
    private actions$: Actions,
    private store: Store<State>,
    private api: ApiService,
    private router: Router
  ) { }
}
