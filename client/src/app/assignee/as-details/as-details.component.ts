import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { State } from 'src/app/reducers';
import { Store, select } from '@ngrx/store';
import { Assignee } from './../../models/assignee';
import { Product } from 'src/app/models/product';
import { Subscription, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Update } from '@ngrx/entity';
import { selectProdByAssegneeId } from 'src/app/warehouse/store/warehouse.selectors';
import { AssigneeUpdate } from './../store/assignee.actions';
import { warehouseRequest, productUpdate } from 'src/app/warehouse/store/warehouse.actions';

@Component({
  selector: 'wh-as-details',
  templateUrl: './as-details.component.html',
  styleUrls: ['./as-details.component.scss']
})
export class AsDetailsComponent implements OnInit, OnDestroy {

  detailsSub: Subscription;
  details: Assignee;
  products: Observable<Product[] | Assignee[]>;
  toUpdate: boolean = false;
  toggleIcon: string = "update";
  dialog: boolean;
  dialogPayload: Product;

  constructor(private route: ActivatedRoute, private store: Store<State>) { }

  ngOnInit() {
    this.detailsSub = this.route.data
      .subscribe(data => {
        this.details = data['details'];
      });
    this.loadProducts(this.details._id);
  }

  loadProducts(id) {
    this.store.dispatch(new warehouseRequest());
    this.products = this.store
      .pipe(
        select(selectProdByAssegneeId(id)),
        map(data => {
          return data;
        })
      );
  }

  update(payload) {
    const assignee: Update<Assignee> = {
      id: this.details._id,
      changes: payload
    }
    this.store.dispatch(new AssigneeUpdate({ assignee }));
  }

  openDialog(prod) {
    this.dialogPayload = prod;
    this.dialog = true;
  }

  unassign(payload: Product = this.dialogPayload) {
    payload.assigneeId = "";
    payload.assignmentDate = null;
    const prod: Update<Product> = {
      id: payload._id,
      changes: payload
    }
    this.store.dispatch(new productUpdate({ prod }));
    this.dialog = false;
  }

  toggleUpdate() {
    if (this.toUpdate) {
      this.toUpdate = false;
      this.toggleIcon = "update"
    } else {
      this.toUpdate = true;
      this.toggleIcon = "details"
    }
  }

  ngOnDestroy() {
    this.detailsSub.unsubscribe();
  }

}
