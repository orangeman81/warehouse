import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginRequest } from './../../models/loginRequest';
import { User } from '../../models/user';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { last, shareReplay, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl: string = environment.baseUrl;
  errorMessage: string;
  isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get token(): string {
    return localStorage.getItem('token');
  }
  set token(value: string) {
    this.isLoggedIn$.next(true);
    localStorage.setItem('token', value);
  }

  get isAuthenticated(): boolean {
    const helper = new JwtHelperService();
    const results = !helper.isTokenExpired(this.token);
    this.isLoggedIn$.next(results);
    return results;
  }

  constructor(private http: HttpClient, public router: Router) { }

  $login(credentials): Observable<LoginRequest> {
    return this.http.post<LoginRequest>(this.baseUrl + 'login', JSON.stringify(credentials))
      .pipe(
        tap((res: LoginRequest) => {
          if (res.user) {
            this.token = res.token;
            this.errorMessage != "" ? this.errorMessage = "" : null;
            this.router.navigate(['main']);
          } else {
            this.errorMessage = res.message;
          }
        }),
        last(),
        shareReplay()
      )
  }

  logout() {
    localStorage.removeItem('token');
    this.isLoggedIn$.next(false);
    this.router.navigate(['login']);
  }

  $createUser(credentials): Observable<User> {
    return this.http.post<User>(this.baseUrl + 'user', JSON.stringify(credentials))
      .pipe(
        last(),
        shareReplay()
      )
  }
}