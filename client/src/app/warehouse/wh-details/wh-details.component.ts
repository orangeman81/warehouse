import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from 'src/app/reducers';
import { productUpdate } from '../store/warehouse.actions';
import { Update } from '@ngrx/entity';
import { Movement } from 'src/app/models/movement';
import { ApiService } from 'src/app/services/api.service';
import { map } from 'rxjs/operators';
import { Paginated } from '@feathersjs/feathers';

@Component({
  selector: 'wh-wh-details',
  templateUrl: './wh-details.component.html',
  styleUrls: ['./wh-details.component.scss']
})
export class WhDetailsComponent implements OnInit, OnDestroy {

  detailsSub: Subscription;
  details: Product;
  movSub: Subscription;
  movements: Movement[];
  movLength: number;
  toUpdate: boolean = false;
  toggleIcon: string = "update";

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

    this.loadMovements(0);
  }

  loadMovements(skip) {
    this.movSub = this.api.$connect('movements', {
      $sort: { createdAt: -1 },
      $skip: skip,
      productId: this.details._id
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
    const prod: Update<Product> = {
      id: this.details._id,
      changes: payload
    }
    this.store.dispatch(new productUpdate({ prod }));
  }

  toggleUpdate() {
    if (this.toUpdate) {
      this.toUpdate = false;
      this.toggleIcon = "update";
    } else {
      this.toUpdate = true;
      this.toggleIcon = "details";
    }
  }

  ngOnDestroy() {
    this.detailsSub.unsubscribe();
    this.movSub.unsubscribe();
  }

}
