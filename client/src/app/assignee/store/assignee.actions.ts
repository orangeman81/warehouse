import { Action } from '@ngrx/store';
import { Assignee } from '../../models/assignee';
import { Update } from '@ngrx/entity';

export enum AssigneeActionTypes {
  AssigneesRequest = '[Assignee] Assignee requested Action',
  AssigneesLoad = '[Assignee] Assignee loaded Action',
  AssigneeRequest = '[Assignee details page] Assignee requested',
  AssigneeLoad = '[Assignee API] Assignee loaded',
  AssigneeCreated = '[Assignee API] Assignee created',
  AssigneeUpdate = '[Assignee details page] Assignee update',
  AssigneeUpdated = '[Assignee API] Assignee updated',
  AssigneeDeleteReq = '[Assignee List page] Assignee delete request',
  AssigneeDeleted = '[Assignee API] Assignee deleted'
}

export class AssigneesRequest implements Action {
  readonly type = AssigneeActionTypes.AssigneesRequest;
}
export class AssigneesLoad implements Action {
  readonly type = AssigneeActionTypes.AssigneesLoad;
  constructor(public payload: { assignees: Assignee[] }) { }
}
export class AssigneeRequest implements Action {
  readonly type = AssigneeActionTypes.AssigneeRequest;
  constructor(public payload: { assigneeId: string }) { }
}
export class AssigneeLoad implements Action {
  readonly type = AssigneeActionTypes.AssigneeLoad;
  constructor(public payload: { assignee: Assignee }) { }
}
export class AssigneeCreated implements Action {
  readonly type = AssigneeActionTypes.AssigneeCreated;
  constructor(public payload: { assignee: Assignee }) { }
}
export class AssigneeUpdate implements Action {
  readonly type = AssigneeActionTypes.AssigneeUpdate;
  constructor(public payload: { assignee: Update<Assignee> }) { }
}
export class AssigneeUpdated implements Action {
  readonly type = AssigneeActionTypes.AssigneeUpdated;
}
export class AssigneeDeleteReq implements Action {
  readonly type = AssigneeActionTypes.AssigneeDeleteReq;
  constructor(public payload: { assigneeId: string }) { }
}
export class AssigneeDeleted implements Action {
  readonly type = AssigneeActionTypes.AssigneeDeleted;
  constructor(public payload: { assigneeId: string }) { }
}

export type AssigneeActions = AssigneesRequest | AssigneesLoad | AssigneeRequest | AssigneeLoad | AssigneeCreated | AssigneeUpdate | AssigneeUpdated | AssigneeDeleteReq | AssigneeDeleted;
