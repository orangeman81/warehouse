<<<<<<< HEAD
import { WarehouseService } from 'src/app/services/warehouse.service';
import { WarehouseActionTypes, LoadWarehouse } from './warehouse.actions';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
=======
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { WarehouseActionTypes, productRequest, productLoad, warehouseRequest, warehouseLoad } from './warehouse.actions';
import { mergeMap, map, withLatestFrom, filter } from 'rxjs/operators';
import { WarehouseService } from 'src/app/services/warehouse.service';
import { Store, select } from '@ngrx/store';
import { State } from 'src/app/reducers';
import { warehouseLoaded } from './warehouse.selectors';
>>>>>>> 5826ca826c3d862f541e7725a79ac540836ea898


@Injectable()
export class WarehouseEffects {

<<<<<<< HEAD
  // @Effect()
  // $load = this.actions$
  //   .pipe(
  //     ofType(WarehouseActionTypes.LoadWarehouse),
  //     tap(action => {
  //       this.ws.$findProduct()
  //         .subscribe(data => {
  //           this.store.dispatch(new LoadWarehouse({ data: data }));
  //         }
  //         );
  //     })
  //   )

  // constructor(private actions$: Actions) { }
=======
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
>>>>>>> 5826ca826c3d862f541e7725a79ac540836ea898
}
