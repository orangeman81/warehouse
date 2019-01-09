import { Product } from './../models/product';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { first, last } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {

  baseUrl: string = 'http://localhost:1337/';

  constructor(private http: HttpClient) { }

  $findProduct(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl + 'warehouse?sort=createdAt DESC')
      .pipe(
        first()
      )
  }

  $findOneProduct(id): Observable<Product> {
    return this.http.get<Product>(this.baseUrl + 'warehouse/' + id)
      .pipe(
        first()
      )
  }

  $createProduct(payload): Observable<Product> {
    return this.http.post<Product>(this.baseUrl + 'warehouse', JSON.stringify(payload))
      .pipe(
        last()
      )
  }

  $deleteProduct(id) {
    return this.http.delete<Product>(this.baseUrl + 'warehouse/' + id)
    .pipe(
      last()
    )
  }

}
