import { mergeMap, tap, map, filter } from 'rxjs/operators';
import { AuthService } from './../../services/auth/auth.service';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AuthActionTypes, Logout, LoginActionRequest, Login } from './auth.actions';
import { Router } from '@angular/router';
import { defer } from 'rxjs';


@Injectable()
export class AuthEffects {

  @Effect()
  login$ = this.actions$
    .pipe(
      ofType<LoginActionRequest>(AuthActionTypes.LoginRequest),
      mergeMap(action => this.auth.$login(action.payload)),
      map(res => {
        if (res.user != false) {
          this.auth.token = res.token;
          this.router.navigate(['main'])
          return new Login({ user: res.user, message: res.message, isLoggedIn: true })
        } else {
          return new Login({ user: false, message: res.message, isLoggedIn: false })
        }
      })
    );

  @Effect({ dispatch: false })
  logout$ = this.actions$
    .pipe(
      ofType<Logout>(AuthActionTypes.LogoutAction),
      tap(() => {
        localStorage.removeItem('token');
        this.router.navigate(['login']);
      })
    );

  @Effect()
  init$ = defer(() => {
    if (this.auth.isAuthenticated) {
      console.log("refreshed");
      new Login({ user: null, message: "", isLoggedIn: true })
    } else {
      console.log("not refreshed");
      new Login({ user: false, message: "", isLoggedIn: false })
    }
  })

  constructor(
    private actions$: Actions,
    private auth: AuthService,
    private router: Router
  ) { }
}