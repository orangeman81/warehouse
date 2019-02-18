import { WarehouseActions, WarehouseActionTypes } from './warehouse.actions';
import { Product } from '../../models/product';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';


export interface whState extends EntityState<Product> {
  warehouseLoaded: boolean;
}

export const adapter: EntityAdapter<Product> = createEntityAdapter<Product>({
  selectId: (product: Product) => product._id
});

export const initialWhState: whState = adapter.getInitialState({
  warehouseLoaded: false
});

export function whReducer(state = initialWhState, action: WarehouseActions): whState {
  switch (action.type) {
    case WarehouseActionTypes.warehouseLoad: {
      return adapter.addAll(action.payload.warehouse, { ...state, warehouseLoaded: true })
    }
    case WarehouseActionTypes.productLoad: {
      return adapter.addOne(action.payload.prod, state)
    }
    case WarehouseActionTypes.productUpdate: {
      return adapter.updateOne(action.payload.prod, state)
    }
    case WarehouseActionTypes.productDeleted: {
      return adapter.removeOne(action.payload.prodId, state)
    }
    default: {
      return state;
    }
  }
}
