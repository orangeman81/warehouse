import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { first, shareReplay, last } from 'rxjs/operators';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  baseUrl: string = environment.baseUrl;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Headers': '*'
    })
  };

  constructor(private http: HttpClient) { }

  $find(url): Observable<any> {
    return this.http.get(this.baseUrl + `${url}?$limit=-1$$sort[createdAt]=-1`, this.httpOptions)
      .pipe(
        first(),
        shareReplay()
      )
  }

  $findPaged(url, skip): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + `${url}?$limit=10?$skip=${skip}?$sort[createdAt]=-1`, this.httpOptions)
      .pipe(
        first(),
        shareReplay()
      )
  }

  $findOne(url, id): Observable<any> {
    return this.http.get<any>(this.baseUrl + `${url}/` + id, this.httpOptions)
      .pipe(
        first(),
        shareReplay()
      )
  }

  $create(url, payload): Observable<any> {
    return this.http.post<any>(this.baseUrl + `${url}`, payload)
      .pipe(
        last(),
        shareReplay()
      )
  }

  $update(url, payload): Observable<any> {
    return this.http.patch<any>(this.baseUrl + `${url}/` + payload.id, payload.changes, this.httpOptions)
      .pipe(
        last(),
        shareReplay()
      )
  }

  $delete(url, id) {
    return this.http.delete<any>(this.baseUrl + `${url}/` + id, this.httpOptions)
      .pipe(
        last(),
        shareReplay()
      )
  }
}
