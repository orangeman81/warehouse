import { Action } from '@ngrx/store';
import { Product } from '../../models/product';
import { Update } from '@ngrx/entity';
import { Movement } from 'src/app/models/movement';

export enum WarehouseActionTypes {
  warehouseRequest = '[Warehouse] warehouse requested Action',
  warehouseLoad = '[Warehouse] warehouse loaded Action',
  productRequest = '[product details page] product requested',
  productLoad = '[warehouse API] product loaded',
  productCreated = '[warehouse API] product created',
  productUpdate = '[warehouse details page] product update',
  productAssign = '[assignee details page] product assignment',
  productUpdated = '[warehouse API] product updated',
  productDeleteReq = '[product List page] product delete request',
  productDeleted = '[warehouse API] product deleted'
}

export class warehouseRequest implements Action {
  readonly type = WarehouseActionTypes.warehouseRequest;
}
export class warehouseLoad implements Action {
  readonly type = WarehouseActionTypes.warehouseLoad;
  constructor(public payload: { warehouse: Product[] }) { }
}
export class productRequest implements Action {
  readonly type = WarehouseActionTypes.productRequest;
  constructor(public payload: { prodId: string }) { }
}
export class productLoad implements Action {
  readonly type = WarehouseActionTypes.productLoad;
  constructor(public payload: { prod: Product }) { }
}
export class productCreated implements Action {
  readonly type = WarehouseActionTypes.productCreated;
  constructor(public payload: { prod: Product }) { }
}
export class productUpdate implements Action {
  readonly type = WarehouseActionTypes.productUpdate;
  constructor(public payload: { prod: Update<Product> }) { }
}
export class productAssign implements Action {
  readonly type = WarehouseActionTypes.productAssign;
  constructor(public payload: { prod: Update<Product>, mov: Movement }) { }
}
export class productUpdated implements Action {
  readonly type = WarehouseActionTypes.productUpdated;
}
export class productDeleteReq implements Action {
  readonly type = WarehouseActionTypes.productDeleteReq;
  constructor(public payload: { prodId: string }) { }
}
export class productDeleted implements Action {
  readonly type = WarehouseActionTypes.productDeleted;
  constructor(public payload: { prodId: string }) { }
}

export type WarehouseActions = warehouseRequest | warehouseLoad | productRequest | productLoad | productCreated | productUpdate | productUpdated | productDeleteReq | productDeleted;
