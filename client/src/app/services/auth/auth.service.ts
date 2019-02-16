import { FeathersService } from './../feathers.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginRequest } from './../../models/loginRequest';
import { User } from '../../models/user';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
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
    return localStorage.getItem('feathers-jwt');
  }
  set token(value: string) {
    localStorage.setItem('feathers-jwt', value);
  }

  get userInfo(): User {
    const helper = new JwtHelperService();
    const results = helper.decodeToken(this.token);
    console.log(results)
    return results.userInfo;
  }

  get isAuthenticated(): boolean {
    const helper = new JwtHelperService();
    const results = !helper.isTokenExpired(this.token);
    return results;
  }

  constructor(private http: HttpClient, private api: FeathersService) { }

  $login(credentials): Observable<LoginRequest> {
    return from(
      this.api.authenticate({
        strategy: 'local',
        email: credentials.email,
        password: credentials.password
      }))
  }

  $createUser(credentials): Observable<User> {
    return this.http.post<User>(this.baseUrl + 'user', JSON.stringify(credentials), this.httpOptions)
      .pipe(
        last(),
        shareReplay()
      )
  }
}