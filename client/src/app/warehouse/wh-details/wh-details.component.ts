import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from 'src/app/reducers';
import { productUpdate } from '../store/warehouse.actions';
import { Update } from '@ngrx/entity';

@Component({
  selector: 'wh-wh-details',
  templateUrl: './wh-details.component.html',
  styleUrls: ['./wh-details.component.scss']
})
export class WhDetailsComponent implements OnInit, OnDestroy {

  detailsSub: Subscription;
  details: Product;
  toUpdate: boolean = false;
  toggleIcon: string = "update";

  constructor(private route: ActivatedRoute, private store: Store<State>) { }

  ngOnInit() {
    this.detailsSub = this.route.data
      .subscribe(data => {
        this.details = data['details'];
      });
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
  }

}
