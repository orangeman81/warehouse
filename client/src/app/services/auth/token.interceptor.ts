import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable, throwError } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from 'src/app/reducers';
import { Logout } from 'src/app/login/store/auth.actions';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(public auth: AuthService, private store: Store<State>) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (!this.auth.isAuthenticated) {
            this.store.dispatch(new Logout);
            if (request.headers.has('Authorization')) {
                request = request.clone();
                return next.handle(request);
            } else {
                return throwError(new Error('Token expired'));
            }
        } else {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${this.auth.token}`
                }
            });
            return next.handle(request);
        }
    }
}