import { Paginated } from '@feathersjs/feathers';
import { ApiService } from 'src/app/services/api.service';
import { Subscription, Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'wh-movements',
  templateUrl: './movements.component.html',
  styleUrls: ['./movements.component.scss']
})
export class MovementsComponent implements OnInit {

  movements: Observable<any>;
  movSub: Subscription;
  movLength: number;
  toggleSearch: boolean = true;
  queryParams: object;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.movements = this.api.$connect('movements')
      .pipe(
        map((res: Paginated<any>) => {
          this.movLength = res.total;
          return res.data;
        })
      )
  }

  loadMovements(skip, query?) {
    this.movements = this.api.$connect('movements', {
      $sort: { createdAt: -1 },
      $skip: skip,
      $limit: 10
    })
      .pipe(
        map((res: Paginated<any>) => {
          this.movLength = res.total;
          return res.data;
        })
      )
  }

  toggle(value) {
    value == true ? this.toggleSearch = true : this.toggleSearch = false;
  }

  loadSearch(query) {
    if (query == "") {
      this.loadMovements(0);
    } else {
      if (this.toggleSearch) {
        this.queryParams = {
          $sort: { createdAt: -1 },
          product: query,
        }
      } else {
        this.queryParams = {
          $sort: { createdAt: -1 },
          assignee: query,
        }
      }
      this.movements = this.api.$connect('movements', this.queryParams)
        .pipe(
          map((res: Paginated<any>) => {
            this.movLength = res.total;
            this.movLength = 0;
            return res.data;
          })
        )
    }
  }

}
