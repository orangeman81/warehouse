import { AssigneeActions, AssigneeActionTypes } from './assignee.actions';
import { Assignee } from '../../models/assignee';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';


export interface asState extends EntityState<Assignee> {
  assigneesLoaded: boolean;
}

export const adapter: EntityAdapter<Assignee> = createEntityAdapter<Assignee>({
  selectId: (assignee: Assignee) => assignee._id
});

export const initialAsState: asState = adapter.getInitialState({
  assigneesLoaded: false
});

export function asReducer(state = initialAsState, action: AssigneeActions): asState {
  switch (action.type) {
    case AssigneeActionTypes.AssigneesLoad: {
      return adapter.addAll(action.payload.assignees, { ...state, assigneesLoaded: true })
    }
    case AssigneeActionTypes.AssigneeLoad: {
      return adapter.addOne(action.payload.assignee, state)
    }
    case AssigneeActionTypes.AssigneeUpdate: {
      return adapter.updateOne(action.payload.assignee, state)
    }
    case AssigneeActionTypes.AssigneeDeleted: {
      return adapter.removeOne(action.payload.assigneeId, state)
    }
    default: {
      return state;
    }
  }
}
