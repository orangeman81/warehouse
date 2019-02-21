import { productAssign } from './../../warehouse/store/warehouse.actions';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { State } from 'src/app/reducers';
import { Store, select } from '@ngrx/store';
import { Assignee } from './../../models/assignee';
import { Product } from 'src/app/models/product';
import { Subscription } from 'rxjs';
import { Update } from '@ngrx/entity';
import { selectProdByAssegneeId } from 'src/app/warehouse/store/warehouse.selectors';
import { AssigneeUpdate, AssigneeDeleteReq } from './../store/assignee.actions';
import { warehouseRequest } from 'src/app/warehouse/store/warehouse.actions';
import { Movement } from 'src/app/models/movement';
import { map } from 'rxjs/operators';
import { Paginated } from '@feathersjs/feathers';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'wh-as-details',
  templateUrl: './as-details.component.html',
  styleUrls: ['./as-details.component.scss']
})
export class AsDetailsComponent implements OnInit, OnDestroy {

  detailsSub: Subscription;
  productsSub: Subscription;
  movSub: Subscription;
  details: Assignee;
  products: Product[];
  movements: Movement[];
  movLength: number;
  toUpdate: boolean = false;
  toggleIcon: string = "update";
  dialog: boolean;
  deleteDialog: boolean;
  dialogPayload: any;

  constructor(
    private route: ActivatedRoute,
    private store: Store<State>,
    private api: ApiService
  ) { }

  ngOnInit() {
    this.detailsSub = this.route.data
      .subscribe(data => {
        this.details = data['details'];
      });
    this.loadProducts(this.details._id);
    this.loadMovements(0);
  }

  loadProducts(id) {
    this.store.dispatch(new warehouseRequest());
    this.productsSub = this.store
      .pipe(
        select(selectProdByAssegneeId(id)),
      ).subscribe(prod => {
        this.products = prod;
      })
  }

  loadMovements(skip) {
    this.movSub = this.api.$connect('movements', {
      $sort: { createdAt: -1 },
      $skip: skip,
      $limit: 5,
      assigneeId: this.details._id
    })
      .pipe(
        map((res: Paginated<any>) => {
          this.movLength = res.total;
          this.movements = res.data;
        })
      )
      .subscribe()
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

  openDeleteDialog() {
    this.dialogPayload = this.details;
    this.deleteDialog = true;
  }

  unassign(payload = this.dialogPayload) {
    payload.assigneeId = "";
    payload.assignmentDate = null;
    const prod: Update<Product> = {
      id: payload._id,
      changes: payload
    }
    const mov: Movement = new Movement(
      null,
      this.details._id,
      this.details.name + " " + this.details.surname,
      payload._id,
      payload.name,
      true
    );
    this.store.dispatch(new productAssign({ prod, mov }));
    this.dialog = true ? this.dialog = false : null;
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

  delete(id: string = this.dialogPayload._id) {
    this.products.forEach(el => {
      el.assigneeId = "";
      this.unassign(el);
    })
    this.store.dispatch(new AssigneeDeleteReq({ assigneeId: id }));
  }

  ngOnDestroy() {
    this.detailsSub.unsubscribe();
    this.productsSub.unsubscribe();
  }

}
