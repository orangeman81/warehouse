import { Component, OnInit, OnDestroy } from '@angular/core';
import { WarehouseService } from 'src/app/services/warehouse.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { LoadWarehouse } from './../warehouse.actions';
import { State } from './../../reducers/index';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'wh-wh-list',
  templateUrl: './wh-list.component.html',
  styleUrls: ['./wh-list.component.scss']
})
export class WhListComponent implements OnInit, OnDestroy {

  prodSub: Subscription;
  products: Product[];
  operationSub: Subscription;
  constructor(private ws: WarehouseService, private store: Store<State>) { }

  ngOnInit() {
    this.LoadProducts();
  }

  LoadProducts() {
    this.prodSub = this.ws.$findProduct()
      .subscribe(
        data => {
          this.products = data;
        },
        console.log,
        () => {
          this.store.dispatch(new LoadWarehouse({ data: this.products }));
        }
      )
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
    this.prodSub.unsubscribe();
    if (this.operationSub) {
      this.operationSub.unsubscribe();
    }
  }

}
