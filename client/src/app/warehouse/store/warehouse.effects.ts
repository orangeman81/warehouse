import { Paginated } from '@feathersjs/feathers';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { WarehouseActionTypes, productRequest, productLoad, warehouseRequest, warehouseLoad, productCreated, productDeleted, productDeleteReq, productUpdated, productUpdate, productCheckin, productAssign } from './warehouse.actions';
import { mergeMap, map, withLatestFrom, filter, tap } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { State } from 'src/app/reducers';
import { warehouseLoaded } from './warehouse.selectors';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';


@Injectable()
export class WarehouseEffects {

  @Effect()
  createProd$ = this.actions$
    .pipe(
      ofType<productCreated>(WarehouseActionTypes.productCreated),
      mergeMap(action => this.api.$create('warehouse', action.payload)),
      map(prod => new productLoad({ prod })),
      tap(() => this.router.navigate(['/warehouse']))
    );

  //method to create, no router needed  
  @Effect()
  checkProd$ = this.actions$
    .pipe(
      ofType<productCheckin>(WarehouseActionTypes.productCheckin),
      mergeMap(action => this.api.$create('warehouse', action.payload)),
      map(prod => new productLoad({ prod }))
    );

  //TODO: switch update methods to have an action to call, a call, then an action to store data
  @Effect()
  updateProd$ = this.actions$
    .pipe(
      ofType<productUpdate>(WarehouseActionTypes.productUpdate),
      mergeMap(action => this.api.$update('warehouse', action.payload.prod)),
      map(() => new productUpdated()),
      tap(() => this.router.navigate(['/warehouse']))
    );

  //method to update, no router needed  
  @Effect()
  assignProd$ = this.actions$
    .pipe(
      ofType<productAssign>(WarehouseActionTypes.productAssign),
      mergeMap(action => this.api.$update('warehouse', action.payload.prod)),
      map(() => new productUpdated())
    );

  @Effect()
  deleteProd$ = this.actions$
    .pipe(
      ofType<productDeleteReq>(WarehouseActionTypes.productDeleteReq),
      mergeMap(action => this.api.$delete('warehouse', action.payload.prodId)),
      map(prodId => new productDeleted({ prodId: prodId._id }))
    );

  @Effect()
  loadProd$ = this.actions$
    .pipe(
      ofType<productRequest>(WarehouseActionTypes.productRequest),
      mergeMap(action => this.api.$findOne('warehouse', action.payload)),
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
      mergeMap(action =>
        this.api.$connect('warehouse')
          .pipe(
            map((res: Paginated<any>) => res.data)
          )
      ),
      map(warehouse => new warehouseLoad({ warehouse }))
    )

  constructor(
    private actions$: Actions,
    private store: Store<State>,
    private api: ApiService,
    private router: Router
  ) { }
}