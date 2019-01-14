import { Action } from '@ngrx/store';
import { Product } from '../../models/product';

export enum WarehouseActionTypes {
  warehouseRequest = '[Warehouse] warehouse requested Action',
  warehouseLoad = '[Warehouse] warehouse loaded Action',
  productRequest = '[product details page] product requested',
  productLoad = '[warehouse API] product loaded'
}

export class warehouseRequest implements Action {
  readonly type = WarehouseActionTypes.warehouseRequest;
}
export class warehouseLoad implements Action {
  readonly type = WarehouseActionTypes.warehouseLoad;
  constructor(public payload: {warehouse: Product[]}) { }
}

export class productRequest implements Action {
  readonly type = WarehouseActionTypes.productRequest;
  constructor(public payload: { prodId: string }) { }
}

export class productLoad implements Action {
  readonly type = WarehouseActionTypes.productLoad;
  constructor(public payload: { prod: Product }) { }
}

export type WarehouseActions = warehouseRequest | warehouseLoad | productRequest | productLoad;
