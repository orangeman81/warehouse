import { mergeMap, tap, map, filter } from 'rxjs/operators';
import { AuthService } from './../../services/auth/auth.service';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AuthActionTypes, Logout, LoginActionRequest, Login } from './auth.actions';
import { Router } from '@angular/router';
import { defer } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from 'src/app/reducers';


@Injectable()
export class AuthEffects {

  @Effect()
  login$ = this.actions$
    .pipe(
      ofType<LoginActionRequest>(AuthActionTypes.LoginRequest),
      mergeMap(action => this.auth.$login(action.payload)),
      map(res => {
        if (res.user) {
          // this.auth.token = res.accessToken;
          this.router.navigate(['main'])
          return new Login({ user: res.user, message: "Login Succesful", isLoggedIn: true })
        } else {
          return new Login({ user: false, message: "User doesn't exist", isLoggedIn: false })
        }
      })
    );

  @Effect({ dispatch: false })
  logout$ = this.actions$
    .pipe(
      ofType<Logout>(AuthActionTypes.LogoutAction),
      tap(() => {
        localStorage.removeItem('feathers-jwt');
        this.router.navigate(['login']);
      })
    );

  @Effect()
  init$ = defer(() => {
    if (this.auth.isAuthenticated) {
      const tokenInfo = this.auth.userInfo;
      const user = {
        email: tokenInfo.email,
        username: tokenInfo.username,
        id: tokenInfo.id
      };
      this.store.dispatch(new Login({ user: user, message: "Login Succesful", isLoggedIn: true }));
      this.auth.initAuth();
    } else {
      this.store.dispatch(new Login({ user: false, message: "", isLoggedIn: false }));
    }
  })

  constructor(
    private actions$: Actions,
    private auth: AuthService,
    private router: Router,
    private store: Store<State>
  ) { }
}