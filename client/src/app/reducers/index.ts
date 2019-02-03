import { AuthActionTypes } from './../login/store/auth.actions';
import { User } from './../models/user';
import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { AuthActions } from '../login/store/auth.actions';

type AuthState = {
  message: string,
  user: User | boolean,
  isLoggedIn: boolean
}

export const initialAuthState: AuthState = {
  user: false,
  message: "",
  isLoggedIn: false
};

export interface State {
  auth: AuthState
}

export function authReducer(state = initialAuthState, action: AuthActions): AuthState {
  switch (action.type) {
    case AuthActionTypes.LoginAction: {
      return {
        user: action.payload.user,
        message: action.payload.message,
        isLoggedIn: action.payload.isLoggedIn
      }
    }
    case AuthActionTypes.LogoutAction: {
      return {
        user: false,
        message: "",
        isLoggedIn: false
      }
    }
    default: {
      return state;
    }
  }
}

export const reducers: ActionReducerMap<State> = {
  auth: authReducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
