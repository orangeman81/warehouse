import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Assignee } from './../../models/assignee';
import { Store, select } from '@ngrx/store';
import { State } from 'src/app/reducers';
import { selectAssigneeById } from '../store/assignee.selectors';
import { tap, filter, first } from 'rxjs/operators';
import { AssigneeRequest } from './../store/assignee.actions';


@Injectable()
export class AsDetailsResolver implements Resolve<Assignee> {

    constructor(private store: Store<State>) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Assignee> {
        return this.store
            .pipe(
                select(selectAssigneeById(route.params['id'])),
                tap(prod => {
                    if (!prod) {
                        this.store.dispatch(new AssigneeRequest(route.params['id']))
                    }
                }),
                filter(prod => !!prod),
                first()
            )
    }
}