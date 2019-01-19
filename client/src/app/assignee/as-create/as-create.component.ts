import { AssigneeCreated } from '../store/assignee.actions';
import { State } from 'src/app/reducers';
import { Store } from '@ngrx/store';
import { Component } from '@angular/core';

@Component({
  selector: 'wh-as-create',
  templateUrl: './as-create.component.html',
  styleUrls: ['./as-create.component.scss']
})
export class AsCreateComponent {

  constructor(private store: Store<State>) { }

  save(payload) {
    this.store.dispatch(new AssigneeCreated(payload))
  }

}
