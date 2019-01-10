import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { WarehouseActionTypes, productRequest, productLoad } from './warehouse.actions';
import { mergeMap, map, tap } from 'rxjs/operators';
import { WarehouseService } from 'src/app/services/warehouse.service';


@Injectable()
export class WarehouseEffects {

  @Effect()
  loadProd$ = this.actions$
    .pipe(
      ofType<productRequest>(WarehouseActionTypes.productRequest),
      tap(action => console.log(action.payload)),
      mergeMap(action => this.ws.$findOneProduct(action.payload)),
      map(prod => new productLoad({prod}))
    );

  constructor(private actions$: Actions, private ws: WarehouseService) {}
}
