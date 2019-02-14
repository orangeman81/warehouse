import { State } from './../../reducers/index';
import { Router } from '@angular/router';
import { AssigneeUpdated, AssigneeCreated, AssigneeActionTypes, AssigneeLoad, AssigneeDeleteReq, AssigneeDeleted, AssigneeRequest, AssigneesLoad, AssigneesRequest } from './assignee.actions';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { filter, mergeMap, map, tap, withLatestFrom } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { AssigneesService } from 'src/app/services/assignees.service';
import { AssigneesLoaded } from './assignee.selectors';


@Injectable()
export class AssigneeEffects {

  @Effect()
  createassignee$ = this.actions$
    .pipe(
      ofType<AssigneeCreated>(AssigneeActionTypes.AssigneeCreated),
      mergeMap(action => this.as.$createAssignee(action.payload)),
      map(assignee => new AssigneeLoad({ assignee })),
      tap(() => this.router.navigate(['/assignee']))
    );

  @Effect()
  updateassignee$ = this.actions$
    .pipe(
      ofType<AssigneeUpdated>(AssigneeActionTypes.AssigneeUpdated),
      mergeMap(action => this.as.$updateAssignee(action.payload.assignee))
    );

  @Effect()
  deleteassignee$ = this.actions$
    .pipe(
      ofType<AssigneeDeleteReq>(AssigneeActionTypes.AssigneeDeleteReq),
      mergeMap(action => this.as.$deleteAssignee(action.payload.assigneeId)),
      map(assigneeId => new AssigneeDeleted({ assigneeId: assigneeId._id }))
    );

  @Effect()
  loadassignee$ = this.actions$
    .pipe(
      ofType<AssigneeRequest>(AssigneeActionTypes.AssigneeRequest),
      mergeMap(action => this.as.$findOneAssignee(action.payload)),
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
      mergeMap(action => this.as.$findAssignee()),
      map(assignees => new AssigneesLoad({ assignees }))
    )

  constructor(
    private actions$: Actions,
    private store: Store<State>,
    private as: AssigneesService,
    private router: Router
  ) { }
}
