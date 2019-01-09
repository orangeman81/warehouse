import { WarehouseService } from './../../services/warehouse.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product';


@Injectable()
export class WhDetailsResolver implements Resolve<Product> {

    constructor(private ws: WarehouseService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Product> {
        return this.ws.$findOneProduct(route.params.id);
    }
}