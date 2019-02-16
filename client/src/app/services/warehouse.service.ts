import { Paginated } from '@feathersjs/feathers';
import { FeathersService } from './feathers.service';
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

  $findProduct(): Observable<any> {
    return this.http.get<Product[]>(this.baseUrl + 'warehouse?$sort[createdAt]=-1')
      .pipe(
        first(),
        shareReplay()
      )
  }

  $findPagedProduct(skip): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl + `warehouse?$limit=10?$skip=${skip}?$sort[createdAt]=-1`)
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
    return this.http.post<Product>(this.baseUrl + 'warehouse', payload)
      .pipe(
        last(),
        shareReplay()
      )
  }

  $updateProduct(payload): Observable<Product> {
    return this.http.patch<Product>(this.baseUrl + 'warehouse/' + payload.id, payload.changes, this.httpOptions)
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
