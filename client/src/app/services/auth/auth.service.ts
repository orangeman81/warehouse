import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginRequest } from './../../models/loginRequest';
import { User } from '../../models/user';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { last, tap, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl: string = environment.baseUrl;
  isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get token(): string {
    return localStorage.getItem('token');
  }
  set token(value: string) {
    localStorage.setItem('token', value);
  }

  get isAuthenticated(): boolean {
    const helper = new JwtHelperService();
    return !helper.isTokenExpired(this.token);
  }

  constructor(private http: HttpClient) { }

  $login(credentials): Observable<LoginRequest> {
    return this.http.post<LoginRequest>(this.baseUrl + 'login', JSON.stringify(credentials))
      .pipe(
        tap(res => {
          this.token = res.token;
          this.isLoggedIn$.next(true);
        }),
        last(),
        shareReplay()
      )
  }

  logout() {
    this.isLoggedIn$.next(false);
    localStorage.removeItem('token');
  }

  $createUser(credentials): Observable<User> {
    return this.http.post<User>(this.baseUrl + 'user', JSON.stringify(credentials))
      .pipe(
        last()
      )
  }
}