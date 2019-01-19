import { Component, OnInit, OnDestroy } from '@angular/core';
import { WarehouseService } from 'src/app/services/warehouse.service';
import { Subscription, Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { warehouseRequest } from '../store/warehouse.actions';
import { State } from './../../reducers/index';
import { Product } from 'src/app/models/product';
import { selectAllProd } from '../store/warehouse.selectors';

@Component({
  selector: 'wh-wh-list',
  templateUrl: './wh-list.component.html',
  styleUrls: ['./wh-list.component.scss']
})
export class WhListComponent implements OnInit, OnDestroy {

  products: Observable<Product[]>;
  operationSub: Subscription;
  constructor(private ws: WarehouseService, private store: Store<State>) { }

  ngOnInit() {
    this.LoadProducts();
  }

  LoadProducts() {
    this.store.dispatch(new warehouseRequest());
    this.products = this.store
      .pipe(
        select(selectAllProd)
      );
  }

  delete(id) {
    this.operationSub = this.ws.$deleteProduct(id)
      .subscribe(
        () => { },
        console.log,
        () => {
          this.LoadProducts();
        },
      );
  }

  ngOnDestroy() {
    if (this.operationSub) {
      this.operationSub.unsubscribe();
    }
  }

}
