import { createFeatureSelector, createSelector } from '@ngrx/store';
import { whState, adapter } from './warehouse.reducer';
import { paginatedData } from 'src/app/models/paginatedData';

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

export const selectProdPage = (skip: number) => createSelector(
    selectAllProd,
    allProd => {
        const start = skip * 10;
        const end = start + 10;
        const paginatedData: paginatedData = {
            data: allProd.slice(start, end),
            total: allProd.length
        }
        return paginatedData;
    }
)

export const selectProdQuery = (query: string) => createSelector(
    selectAllProd,
    allProd => {
        return allProd.filter(prod => (prod.name.toLowerCase().includes(query.toLowerCase())
            || prod.producer.toLowerCase().includes(query.toLowerCase()))
            || prod.serial.toLowerCase().includes(query.toLowerCase()));
    }
)

export const selectProdByAssegneeId = (assigneeId: string) => createSelector(
    selectAllProd,
    allProd => {
        return allProd.filter(prod => prod.assigneeId == assigneeId)
    }
)

export const selectProdNotAssigned = (skip: number) => createSelector(
    selectAllProd,
    allProd => {
        const start = skip * 10;
        const end = start + 10;
        const paginatedData: paginatedData = {
            data: allProd.filter(prod => !prod.assigneeId).slice(start, end),
            total: allProd.length
        }
        return paginatedData;
    }
)

export const warehouseLoaded = createSelector(
    selectWhState,
    whState => whState.warehouseLoaded
) 