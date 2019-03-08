import { Assignee } from './../../models/assignee';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { warehouseRequest, productDeleted, productDeleteReq } from '../store/warehouse.actions';
import { State } from './../../reducers/index';
import { Product } from 'src/app/models/product';
import { selectAllProd, selectProdPage, selectProdQuery, selectProdNotAssigned } from '../store/warehouse.selectors';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Incoming } from 'src/app/models/incoming';

@Component({
  selector: 'wh-wh-list',
  templateUrl: './wh-list.component.html',
  styleUrls: ['./wh-list.component.scss']
})
export class WhListComponent implements OnInit {

  products: Observable<Product[] | Assignee[] | Incoming[]>;
  prodLength: number;
  dialog: boolean;
  dialogPayload: Product;
  prodIn: boolean = false;

  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.loadProducts(0);
  }

  loadProducts(skip) {
    if (!this.prodIn) {
      this.store.dispatch(new warehouseRequest());
      this.products = this.store
        .pipe(
          select(selectProdPage(skip)),
          map(data => {
            this.prodLength = data.total;
            return data.data;
          })
        );
    } else {
      this.loadProductsIn(skip);
    }
  }

  loadSearch(query: string) {
    if (query === "") {
      this.loadProducts(0);
    } else {
      this.prodIn = true ? this.prodIn = false : null;
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

  loadProductsIn(skip) {
    this.products = this.store
      .pipe(
        select(selectProdNotAssigned(skip)),
        map(data => {
          this.prodLength = data.total;
          return data.data;
        })
      );
  }

  filterProd() {
    if (this.prodIn) {
      this.prodIn = false;
      this.loadProducts(0);
    } else {
      this.prodIn = true;
      this.loadProductsIn(0);
    }
  }

  openDialog(prod) {
    this.dialogPayload = prod;
    this.dialog = true;
  }

  delete(id: string = this.dialogPayload._id) {
    this.store.dispatch(new productDeleteReq({ prodId: id }));
    this.dialog = false;
  }

}
