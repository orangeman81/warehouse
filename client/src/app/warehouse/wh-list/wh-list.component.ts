import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { warehouseRequest, productDeleted, productDeleteReq } from '../store/warehouse.actions';
import { State } from './../../reducers/index';
import { Product } from 'src/app/models/product';
import { selectAllProd, selectProdPage, selectProdQuery } from '../store/warehouse.selectors';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'wh-wh-list',
  templateUrl: './wh-list.component.html',
  styleUrls: ['./wh-list.component.scss']
})
export class WhListComponent implements OnInit {

  products: Observable<Product[]>;
  prodLength: number;
  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.LoadProducts(0);
  }

  LoadProducts(skip) {
    this.store.dispatch(new warehouseRequest());
    this.products = this.store
      .pipe(
        select(selectProdPage(skip)),
        map(data => {
          this.prodLength = data.total;
          return data.data;
        })
      );
  }

  loadSearch(query: string) {
    if (query === "") {
      this.LoadProducts(0);
    } else {
      this.products = this.store
        .pipe(
          select(selectProdQuery(query)),
          map(data => {
            this.prodLength = 0;
            return data;
          })
        );
    }
  }

  delete(id) {
    this.store.dispatch(new productDeleteReq({ prodId: id }));
  }

}
