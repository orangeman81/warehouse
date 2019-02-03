import { Logout } from './../../login/store/auth.actions';
import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { isLoggedIn } from './../../login/store/auth.selectors';
import { State } from 'src/app/reducers';
import { Observable } from 'rxjs';

@Component({
  selector: 'wh-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavComponent implements OnInit {

  isLoggedIn$: Observable<boolean>;

  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.isLoggedIn$ = this.store
      .pipe(
        select(isLoggedIn)
      )
  }

  logout() {
    this.store.dispatch(new Logout());
  }

}