import { Incoming } from 'src/app/models/incoming';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { incomingActions, IncomingActionTypes } from './incoming.actions';

export interface inState extends EntityState<Incoming> {
  incomingLoaded: boolean;
}

export const adapter: EntityAdapter<Incoming> = createEntityAdapter<Incoming>({
  selectId: (incoming: Incoming) => incoming._id
});

export const initialWhState: inState = adapter.getInitialState({
  incomingLoaded: false
});

export function inReducer(state = initialWhState, action: incomingActions): inState {
  switch (action.type) {
    case IncomingActionTypes.allIncomingLoad: {
      return adapter.addAll(action.payload.incoming, { ...state, incomingLoaded: true })
    }
    case IncomingActionTypes.incomingLoad: {
      return adapter.addOne(action.payload.incoming, state)
    }
    case IncomingActionTypes.incomingUpdate: {
      return adapter.updateOne(action.payload.incoming, state)
    }
    case IncomingActionTypes.incomingDeleted: {
      return adapter.removeOne(action.payload.incomingId, state)
    }
    default: {
      return state;
    }
  }
}