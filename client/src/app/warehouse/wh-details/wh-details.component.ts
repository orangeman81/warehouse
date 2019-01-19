import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from 'src/app/reducers';
import { productUpdated } from '../store/warehouse.actions';
import { Update } from '@ngrx/entity';

@Component({
  selector: 'wh-wh-details',
  templateUrl: './wh-details.component.html',
  styleUrls: ['./wh-details.component.scss']
})
export class WhDetailsComponent implements OnInit {

  detailsSub: Subscription;
  details: Product;
  toUpdate: boolean = false;

  constructor(private route: ActivatedRoute, private store: Store<State>) { }

  ngOnInit() {
    this.detailsSub = this.route.data
      .subscribe(data => {
        this.details = data['details'];
      });
  }

  update(payload) {
    const prod: Update<Product> = {
      id: this.details.id,
      changes: payload
    }
    this.store.dispatch(new productUpdated({prod}));
  }

  toggleUpdate() {
    if(this.toUpdate) {
      this.toUpdate = false;
    } else {
      this.toUpdate = true;
    }
  }

}