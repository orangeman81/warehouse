import { Action } from '@ngrx/store';
import { Incoming } from '../../models/incoming';
import { Update } from '@ngrx/entity';

export enum IncomingActionTypes {
  allIncomingRequest = '[incoming list] incoming requested Action',
  allIncomingLoad = '[incoming list] incoming loaded Action',
  incomingRequest = '[incoming details page] incoming requested',
  incomingLoad = '[incoming API] incoming loaded',
  incomingCreated = '[incoming API] incoming created',
  incomingUpdate = '[incoming details page] incoming update',
  incomingUpdated = '[incoming API] incoming updated',
  incomingDeleteReq = '[incoming List page] incoming delete request',
  incomingDeleted = '[incoming API] incoming deleted'
}

export class AllIncomingRequest implements Action {
  readonly type = IncomingActionTypes.allIncomingRequest;
}
export class AllIncomingLoad implements Action {
  readonly type = IncomingActionTypes.allIncomingLoad;
  constructor(public payload: { incoming: Incoming[] }) { }
}
export class IncomingRequest implements Action {
  readonly type = IncomingActionTypes.incomingRequest;
  constructor(public payload: { incomingId: string }) { }
}
export class IncomingLoad implements Action {
  readonly type = IncomingActionTypes.incomingLoad;
  constructor(public payload: { incoming: Incoming }) { }
}
export class IncomingCreated implements Action {
  readonly type = IncomingActionTypes.incomingCreated;
  constructor(public payload: { incoming: Incoming }) { }
}
export class IncomingUpdate implements Action {
  readonly type = IncomingActionTypes.incomingUpdate;
  constructor(public payload: { incoming: Update<Incoming> }) { }
}
export class IncomingUpdated implements Action {
  readonly type = IncomingActionTypes.incomingUpdated;
}
export class IncomingDeleteReq implements Action {
  readonly type = IncomingActionTypes.incomingDeleteReq;
  constructor(public payload: { incomingId: string }) { }
}
export class IncomingDeleted implements Action {
  readonly type = IncomingActionTypes.incomingDeleted;
  constructor(public payload: { incomingId: string }) { }
}

export type incomingActions = AllIncomingRequest | AllIncomingLoad | IncomingRequest | IncomingLoad | IncomingCreated | IncomingUpdate | IncomingUpdated | IncomingDeleteReq | IncomingDeleted;
