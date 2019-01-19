import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { WarehouseActionTypes, productRequest, productLoad, warehouseRequest, warehouseLoad } from './warehouse.actions';
import { mergeMap, map, withLatestFrom, filter } from 'rxjs/operators';
import { WarehouseService } from 'src/app/services/warehouse.service';
import { Store, select } from '@ngrx/store';
import { State } from 'src/app/reducers';
import { warehouseLoaded } from './warehouse.selectors';


@Injectable()
export class WarehouseEffects {

  @Effect()
  loadProd$ = this.actions$
    .pipe(
      ofType<productRequest>(WarehouseActionTypes.productRequest),
      mergeMap(action => this.ws.$findOneProduct(action.payload)),
      map(prod => new productLoad({ prod }))
    );

  @Effect()
  loadWarehouse = this.actions$
    .pipe(
      ofType<warehouseRequest>(WarehouseActionTypes.warehouseRequest),
      withLatestFrom(this.store
        .pipe(
          select(warehouseLoaded)
        )),
      filter(([action, warehouseloaded]) => !warehouseloaded),
      mergeMap(action => this.ws.$findProduct()),
      map(warehouse => new warehouseLoad({ warehouse }))
    )

  constructor(private actions$: Actions, private store: Store<State>, private ws: WarehouseService) { }
}
