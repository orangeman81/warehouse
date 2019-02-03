import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { State } from '../reducers';
import { LoginActionRequest } from './store/auth.actions';
import { Observable } from 'rxjs';
import { message } from './store/auth.selectors';

@Component({
  selector: 'wh-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  message$: Observable<string>;

  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.message$ = this.store
      .pipe(
        select(message)
      )
  }

  signIn(credentials) {
    this.store.dispatch(new LoginActionRequest(credentials));
  }

}
