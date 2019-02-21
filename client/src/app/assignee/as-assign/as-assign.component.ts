import { Movement } from 'src/app/models/movement';
import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Assignee } from 'src/app/models/assignee';
import { Product } from 'src/app/models/product';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { State } from 'src/app/reducers';
import { warehouseRequest, productAssign } from 'src/app/warehouse/store/warehouse.actions';
import { selectProdQuery, selectProdNotAssigned } from 'src/app/warehouse/store/warehouse.selectors';
import { map } from 'rxjs/operators';
import { Update } from '@ngrx/entity';
import { Incoming } from 'src/app/models/incoming';

@Component({
  selector: 'wh-as-assign',
  templateUrl: './as-assign.component.html',
  styleUrls: ['./as-assign.component.scss']
})
export class AsAssignComponent implements OnInit {

  detailsSub: Subscription;
  details: Assignee;
  products: Observable<Product[] | Assignee[] | Incoming[]>;
  prodLength: number;
  dialog: boolean;
  dialogPayload: Product;

  constructor(private route: ActivatedRoute, private router: Router, private store: Store<State>) { }

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
        select(selectProdNotAssigned(skip)),
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

  openDialog(prod) {
    this.dialogPayload = prod;
    this.dialog = true;
  }

  assign(payload: Product = this.dialogPayload) {
    payload.assigneeId = this.details._id;
    payload.assignmentDate = Date.now();
    const prod: Update<Product> = {
      id: payload._id,
      changes: payload
    };
    const mov: Movement = new Movement(
      null,
      this.details._id,
      this.details.name + " " + this.details.surname,
      payload._id,
      payload.name,
      false
    );
    this.store.dispatch(new productAssign({ prod, mov }));
    this.router.navigate(['/assignee/details', this.details._id]);
  }

  ngOnDestroy() {
    this.detailsSub.unsubscribe();
  }

}
