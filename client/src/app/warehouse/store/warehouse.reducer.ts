import { WarehouseActions, WarehouseActionTypes } from './warehouse.actions';
import { Product } from '../../models/product';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';


export interface whState extends EntityState<Product> {

}

export const adapter: EntityAdapter<Product> = createEntityAdapter<Product>();

export const initialWhState: whState = adapter.getInitialState();

export function whReducer(state = initialWhState, action: WarehouseActions): whState {
  switch (action.type) {
    case WarehouseActionTypes.LoadWarehouse: {
      return adapter.addAll(action.payload, state)
    }
    case WarehouseActionTypes.productLoad: {
      return adapter.addOne(action.payload.prod, state)
    }
    default: {
      return state;
    }
  }
}
