import { Action } from '@ngrx/store';
import { Product } from '../../models/product';

export enum WarehouseActionTypes {
  LoadWarehouse = '[Warehouse] Load warehouse Action',
  productRequest = '[product details page] product requested',
  productLoad = '[warehouse API] product loaded'
}

export class LoadWarehouse implements Action {
  readonly type = WarehouseActionTypes.LoadWarehouse;
  constructor(public payload: Product[]) { }
}

export class productRequest implements Action {
  readonly type = WarehouseActionTypes.productRequest;
  constructor(public payload: { prodId: string }) { }
}

export class productLoad implements Action {
  readonly type = WarehouseActionTypes.productLoad;
  constructor(public payload: { prod: Product }) { }
}

export type WarehouseActions = LoadWarehouse | productRequest | productLoad;
