import { createFeatureSelector, createSelector } from '@ngrx/store';
import { inState, adapter } from './incoming.reducer';
import { paginatedData } from 'src/app/models/paginatedData';

export const selectInState = createFeatureSelector<inState>('incoming');

export const selectIncomingById = (incomingId: string) => createSelector(
    selectInState,
    inState => inState.entities[incomingId]
)

export const { selectAll } = adapter.getSelectors();

export const selectAllIncoming = createSelector(
    selectInState,
    selectAll
)

export const selectIncomingPage = (skip: number) => createSelector(
    selectAllIncoming,
    allIncoming => {
        const start = skip * 10;
        const end = start + 10;
        const paginatedData: paginatedData = {
            data: allIncoming.slice(start, end),
            total: allIncoming.length
        }
        return paginatedData;
    }
)

export const selectIncomingQuery = (query: string) => createSelector(
    selectAllIncoming,
    allIncoming => {
        return allIncoming.filter(Incoming => (Incoming.description.toLowerCase().includes(query.toLowerCase())
            || Incoming.sender.toLowerCase().includes(query.toLowerCase()))
            || Incoming.serial.toLowerCase().includes(query.toLowerCase()));
    }
)

export const incomingLoaded = createSelector(
    selectInState,
    inState => inState.incomingLoaded
) 