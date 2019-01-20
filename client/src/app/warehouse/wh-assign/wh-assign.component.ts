import { Update } from '@ngrx/entity';
import { map } from 'rxjs/operators';
import { Assignee } from './../../models/assignee';
import { State } from 'src/app/reducers';
import { Store, select } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { selectProdPage, selectProdQuery } from '../store/warehouse.selectors';
import { warehouseRequest, productUpdated } from '../store/warehouse.actions';

@Component({
  selector: 'wh-wh-assign',
  templateUrl: './wh-assign.component.html',
  styleUrls: ['./wh-assign.component.scss']
})
export class WhAssignComponent implements OnInit, OnDestroy {

  detailsSub: Subscription;
  details: Assignee;
  products: Observable<Product[] | Assignee[]>;
  prodLength: number;

  constructor(private route: ActivatedRoute, private store: Store<State>) { }

  ngOnInit() {
    this.loadProducts(0);
    this.detailsSub = this.route.data
      .subscribe(data => {
        this.details = data['details'];
      });
  }

  loadProducts(skip) {
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
      this.loadProducts(0);
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

  assign(payload: Product) {
    payload.assigneeId = this.details.id;
    payload.assignmentDate = Date.now();
    const prod: Update<Product> = {
      id: payload.id,
      changes: payload
    }
    this.store.dispatch(new productUpdated({ prod }));
  }

  ngOnDestroy() {
    this.detailsSub.unsubscribe();
  }

}
