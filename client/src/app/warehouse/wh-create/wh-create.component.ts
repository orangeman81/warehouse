import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from 'src/app/reducers';
import { productCreated } from '../store/warehouse.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'wh-wh-create',
  templateUrl: './wh-create.component.html',
  styleUrls: ['./wh-create.component.scss']
})
export class WhCreateComponent {

  constructor(private store: Store<State>, private router: Router) { }

  save(payload) {
    this.store.dispatch(new productCreated(payload))
    this.router.navigate(['warehouse']);
  }

}
