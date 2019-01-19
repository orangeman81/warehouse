import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product';
import { Store, select } from '@ngrx/store';
import { State } from 'src/app/reducers';
import { selectProdById } from '../store/warehouse.selectors';
import { tap, filter, first } from 'rxjs/operators';
import { productRequest } from '../store/warehouse.actions';


@Injectable()
export class WhDetailsResolver implements Resolve<Product> {

    constructor(private store: Store<State>) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Product> {
        return this.store
            .pipe(
                select(selectProdById(route.params['id'])),
                tap(prod => {
                    if (!prod) {
                        this.store.dispatch(new productRequest(route.params['id']))
                    }
                }),
                filter(prod => !!prod),
                first()
            )
    }
}