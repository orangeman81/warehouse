import { Action } from '@ngrx/store';
import { Product } from '../models/product';

export enum WarehouseActionTypes {
  LoadWarehouse = '[Warehouse] Load Action'
}

export class LoadWarehouse implements Action {
  readonly type = WarehouseActionTypes.LoadWarehouse;
  constructor(public payload: { data: Product[] }) { }
}

export type WarehouseActions = LoadWarehouse;
