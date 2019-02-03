import { User } from './../../models/user';
import { Action } from '@ngrx/store';
import { isLoggedIn } from './auth.selectors';

export enum AuthActionTypes {
  LoginRequest = '[Login] request login action',
  LoginAction = '[Login] action',
  LogoutAction = '[Logout] action'
}

export class LoginActionRequest implements Action {
  readonly type = AuthActionTypes.LoginRequest;

  constructor(public payload: { username: string, password: string }) { }
}

export class Login implements Action {
  readonly type = AuthActionTypes.LoginAction;

  constructor(public payload: { user: User | boolean, message: string, isLoggedIn: boolean }) { }
}

export class Logout implements Action {
  readonly type = AuthActionTypes.LogoutAction;
}

export type AuthActions = LoginActionRequest | Login | Logout;
