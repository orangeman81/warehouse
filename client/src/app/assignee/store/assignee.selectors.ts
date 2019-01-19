import { createFeatureSelector, createSelector } from '@ngrx/store';
import { asState, adapter } from './assignee.reducer';
import { paginatedData } from 'src/app/models/paginatedData';

export const selectAsState = createFeatureSelector<asState>('assignees');

export const selectAssigneeById = (assigneeId: string) => createSelector(
    selectAsState,
    asState => asState.entities[assigneeId]
)

export const { selectAll } = adapter.getSelectors();

export const selectAllAssignees = createSelector(
    selectAsState,
    selectAll
)

export const selectAssigneePage = (skip: number) => createSelector(
    selectAllAssignees,
    allAssignees => {
        const start = skip * 10;
        const end = start + 10;
        const paginatedData: paginatedData = {
            data: allAssignees.slice(start, end),
            total: allAssignees.length
        }
        return paginatedData;
    }
)

export const selectAssigneeQuery = (query: string) => createSelector(
    selectAllAssignees,
    allAssignee => {
        return allAssignee.filter(prod => (prod.name.toLowerCase().includes(query.toLowerCase())
            || prod.surname.toLowerCase().includes(query.toLowerCase()))
            || prod.phone.toLowerCase().includes(query.toLowerCase()));
    }
)

export const AssigneesLoaded = createSelector(
    selectAsState,
    asState => asState.assigneesLoaded
) 