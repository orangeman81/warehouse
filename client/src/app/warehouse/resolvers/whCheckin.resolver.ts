import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { State } from 'src/app/reducers';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product';
import { selectIncomingById } from 'src/app/incoming/store/incoming.selectors';
import { tap, first } from 'rxjs/operators';
import { Incoming } from 'src/app/models/incoming';

@Injectable()
export class WhCheckinResolver implements Resolve<Incoming> {

    constructor(private store: Store<State>) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Incoming> {
        return this.store
            .pipe(
                select(selectIncomingById(route.params['id'])),
                first()
            )
    }
}