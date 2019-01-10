import { createFeatureSelector, createSelector } from '@ngrx/store';
import { whState } from './warehouse.reducer';

export const selectWhState = createFeatureSelector<whState>('warehouse');
export const selectProdById = (prodId: string) => createSelector(
    selectWhState,
    whState => whState.entities[prodId]
)