import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Incoming } from 'src/app/models/incoming';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { State } from 'src/app/reducers';
import { selectIncomingById } from '../store/incoming.selectors';
import { IncomingRequest } from '../store/incoming.actions';
import { filter, tap, first } from 'rxjs/operators';


@Injectable()
export class InDetailsResolver implements Resolve<Incoming> {

    constructor(private store: Store<State>) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Incoming> {
        return this.store
            .pipe(
                select(selectIncomingById(route.params['id'])),
                tap(incoming => {
                    if (!incoming) {
                        this.store.dispatch(new IncomingRequest(route.params['id']))
                    }
                }),
                filter(incoming => !!incoming),
                first()
            )
    }
}