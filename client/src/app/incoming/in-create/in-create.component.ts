import { State } from 'src/app/reducers';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { username } from 'src/app/login/store/auth.selectors';
import { IncomingCreated } from '../store/incoming.actions';
import { first } from 'rxjs/operators';

@Component({
  selector: 'wh-in-create',
  templateUrl: './in-create.component.html',
  styleUrls: ['./in-create.component.scss']
})
export class InCreateComponent implements OnInit, OnDestroy {

  username: string;
  storeSub: Subscription;

  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.storeSub = this.store
      .pipe(
        select(username),
        first()
      )
      .subscribe(username => this.username = username);
  }

  save(payload) {
    this.store.dispatch(new IncomingCreated(payload))
  }

  ngOnDestroy() {
    this.storeSub.unsubscribe();
  }

}
