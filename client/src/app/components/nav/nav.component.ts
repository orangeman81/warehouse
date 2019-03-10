import { Incoming } from './../../models/incoming';
import { map, switchMap, debounceTime, filter, tap } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';
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
  inCounter$: Observable<number>;

  constructor(
    private store: Store<State>,
    private api: ApiService
  ) { }

  ngOnInit() {
    this.isLoggedIn$ = this.store
      .pipe(
        select(isLoggedIn)
      )

    this.inCounter$ = this.isLoggedIn$
      .pipe(
        debounceTime(50),
        switchMap(() => {
          return this.api.$connect('incoming')
            .pipe(
              map((incomings: Incoming[]) => incomings.length)
            )
        })
      )
  }

  logout() {
    this.store.dispatch(new Logout());
  }

}