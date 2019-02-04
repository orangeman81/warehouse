import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginRequest } from './../../models/loginRequest';
import { User } from '../../models/user';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { last, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl: string = environment.baseUrl;
  errorMessage: string;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic no token'
    })
  };

  get token(): string {
    return localStorage.getItem('token');
  }
  set token(value: string) {
    localStorage.setItem('token', value);
  }

  get userInfo(): User {
    const helper = new JwtHelperService();
    const results = helper.decodeToken(this.token);
    return results;
  }

  get isAuthenticated(): boolean {
    const helper = new JwtHelperService();
    const results = !helper.isTokenExpired(this.token);
    return results;
  }

  constructor(private http: HttpClient) { }

  $login(credentials): Observable<LoginRequest> {
    return this.http.post<LoginRequest>(this.baseUrl + 'login', JSON.stringify(credentials), this.httpOptions)
      .pipe(
        last(),
        shareReplay()
      )
  }

  $createUser(credentials): Observable<User> {
    return this.http.post<User>(this.baseUrl + 'user', JSON.stringify(credentials), this.httpOptions)
      .pipe(
        last(),
        shareReplay()
      )
  }
}