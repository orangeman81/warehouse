import { createFeatureSelector, createSelector } from '@ngrx/store';
import { whState, adapter } from './warehouse.reducer';

export const selectWhState = createFeatureSelector<whState>('warehouse');

export const selectProdById = (prodId: string) => createSelector(
    selectWhState,
    whState => whState.entities[prodId]
)

export const { selectAll } = adapter.getSelectors();

export const selectAllProd = createSelector(
    selectWhState,
    selectAll
)

export const warehouseLoaded = createSelector(
    selectWhState,
    whState => whState.warehouseLoaded
) 