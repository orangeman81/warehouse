import { WarehouseActions, WarehouseActionTypes } from './warehouse.actions';
import { Product } from '../models/product';


export interface State {
  data: Product[];
}

export const initialState: State = {
  data: []
};

export function whReducer(state = initialState, action: WarehouseActions): State {
  switch (action.type) {
    case WarehouseActionTypes.LoadWarehouse: {
      return action.payload
    }
    default: {
      return state;
    }
  }
}
