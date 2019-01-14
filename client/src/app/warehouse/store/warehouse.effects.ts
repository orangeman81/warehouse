import { WarehouseService } from 'src/app/services/warehouse.service';
import { WarehouseActionTypes, LoadWarehouse } from './warehouse.actions';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';


@Injectable()
export class WarehouseEffects {

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
}
