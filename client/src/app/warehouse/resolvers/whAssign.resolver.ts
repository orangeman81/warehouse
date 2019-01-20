import { Assignee } from './../../models/assignee';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { State } from 'src/app/reducers';
import { first } from 'rxjs/operators';
import { selectAssigneeById } from 'src/app/assignee/store/assignee.selectors';


@Injectable()
export class WhAssignResolver implements Resolve<Assignee> {

    constructor(private store: Store<State>) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Assignee> {
        const assignee = this.store
            .pipe(
                select(selectAssigneeById(route.params['id'])),
                first()
            )

        return assignee;
    }
}