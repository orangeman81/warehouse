import { Product } from './../models/product';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { first, last, shareReplay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {

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

  $findProduct(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl + 'warehouse?sort=createdAt DESC')
      .pipe(
        first(),
        shareReplay()
      )
  }

  $findPagedProduct(skip): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl + `warehouse?limit=10?skip=${skip}?sort=createdAt DESC`)
      .pipe(
        first(),
        shareReplay()
      )
  }

  $findOneProduct(id): Observable<Product> {
    return this.http.get<Product>(this.baseUrl + 'warehouse/' + id)
      .pipe(
        first(),
        shareReplay()
      )
  }

  $createProduct(payload): Observable<Product> {
    return this.http.post<Product>(this.baseUrl + 'warehouse', JSON.stringify(payload))
      .pipe(
        last(),
        shareReplay()
      )
  }

  $updateProduct(payload): Observable<Product> {
    return this.http.patch<Product>(this.baseUrl + 'warehouse/' + payload.id, JSON.stringify(payload.changes), this.httpOptions)
      .pipe(
        last(),
        shareReplay()
      )
  }

  $deleteProduct(id) {
    return this.http.delete<Product>(this.baseUrl + 'warehouse/' + id)
      .pipe(
        last(),
        shareReplay()
      )
  }

}
