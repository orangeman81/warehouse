import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { WarehouseActionTypes, productRequest, productLoad, warehouseRequest, warehouseLoad, productCreated, productDeleted, productDeleteReq, productUpdated } from './warehouse.actions';
import { mergeMap, map, withLatestFrom, filter, tap } from 'rxjs/operators';
import { WarehouseService } from 'src/app/services/warehouse.service';
import { Store, select } from '@ngrx/store';
import { State } from 'src/app/reducers';
import { warehouseLoaded } from './warehouse.selectors';
import { Router } from '@angular/router';


@Injectable()
export class WarehouseEffects {

  @Effect()
  createProd$ = this.actions$
    .pipe(
      ofType<productCreated>(WarehouseActionTypes.productCreated),
      mergeMap(action => this.ws.$createProduct(action.payload)),
      map(prod => new productLoad({ prod })),
      tap(() => this.router.navigate(['/warehouse']))
    );

  @Effect()
  updateProd$ = this.actions$
    .pipe(
      ofType<productUpdated>(WarehouseActionTypes.productUpdated),
      mergeMap(action => this.ws.$updateProduct(action.payload.prod))
    );

  @Effect()
  deleteProd$ = this.actions$
    .pipe(
      ofType<productDeleteReq>(WarehouseActionTypes.productDeleteReq),
      mergeMap(action => this.ws.$deleteProduct(action.payload.prodId)),
      map(prodId => new productDeleted({ prodId: prodId._id }))
    );

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
      mergeMap(action => this.ws.$findProduct().pipe(map(res => res.data))),
      map(warehouse => new warehouseLoad({ warehouse }))
    )

  constructor(
    private actions$: Actions,
    private store: Store<State>,
    private ws: WarehouseService,
    private router: Router
  ) { }
}
