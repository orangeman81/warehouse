import { ApiService } from './../../services/api.service';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Incoming } from 'src/app/models/incoming';
import { Observable } from 'rxjs';


@Injectable()
export class InDetailsResolver implements Resolve<Incoming> {

    constructor(private api: ApiService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Incoming> {
        return this.api.$findOne('incoming', route.params['id']);
    }
}