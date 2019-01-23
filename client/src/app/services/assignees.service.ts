import { first, last } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Assignee } from '../models/assignee';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AssigneesService {

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

  $findAssignee(): Observable<Assignee[]> {
    return this.http.get<Assignee[]>(this.baseUrl + 'assignee?sort=createdAt DESC')
      .pipe(
        first()
      )
  }

  $findPagedAssignee(skip): Observable<Assignee[]> {
    return this.http.get<Assignee[]>(this.baseUrl + `assignee?limit=10?skip=${skip}?sort=createdAt DESC`)
      .pipe(
        first()
      )
  }

  $findOneAssignee(id): Observable<Assignee> {
    return this.http.get<Assignee>(this.baseUrl + 'assignee/' + id)
      .pipe(
        first()
      )
  }

  $createAssignee(payload): Observable<Assignee> {
    return this.http.post<Assignee>(this.baseUrl + 'assignee', JSON.stringify(payload))
      .pipe(
        last()
      )
  }

  $updateAssignee(payload): Observable<Assignee> {
    return this.http.patch<Assignee>(this.baseUrl + 'assignee/update/' + payload.id, JSON.stringify(payload.changes), this.httpOptions)
      .pipe(
        last()
      )
  }

  $deleteAssignee(id) {
    return this.http.delete<Assignee>(this.baseUrl + 'assignee/' + id)
      .pipe(
        last()
      )
  }
}
