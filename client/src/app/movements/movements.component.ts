import { Paginated } from '@feathersjs/feathers';
import { ApiService } from 'src/app/services/api.service';
import { Subscription, BehaviorSubject } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';
import { Movement } from '../models/movement';

@Component({
  selector: 'wh-movements',
  templateUrl: './movements.component.html',
  styleUrls: ['./movements.component.scss']
})
export class MovementsComponent implements OnInit, OnDestroy {

  movements: Movement[];
  movSub: Subscription;
  movLength: number;
  allToggle: boolean = true;
  inToggle: boolean = false;
  outToggle: boolean = false;
  searchSub: Subscription;
  get skip(): number {
    return this.queryParams.value.$skip;
  }
  set skip(value: number) {
    let query = this.queryParams.value;
    query.$skip = value;
    this.queryParams.next(query);
  }
  queryParams: BehaviorSubject<any> = new BehaviorSubject<any>(
    {
      $sort: { createdAt: -1 },
      $limit: 10,
      $skip: 0
    }
  );

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.loadMovements();
  }

  loadMovements() {
    this.searchSub = this.queryParams
      .pipe(
        switchMap(params => {
          return this.api.$connect('movements', params)
        }),
        map((res: Paginated<any>) => {
          this.movLength = res.total;
          this.movements = res.data;
        })
      ).subscribe()
  }

  filterMovements(value: number) {
    switch (value) {
      case 1: {
        this.allToggle = true;
        this.inToggle = false;
        this.outToggle = false;
        return this.queryParams.next({
          $sort: { createdAt: -1 },
          $limit: 10,
          $skip: 0
        })
      }
      case 2: {
        this.allToggle = false;
        this.inToggle = true;
        this.outToggle = false;
        return this.queryParams.next({
          $sort: { createdAt: -1 },
          $limit: 10,
          $skip: 0,
          inOut: true
        })
      }
      case 3: {
        this.allToggle = false;
        this.inToggle = false;
        this.outToggle = true;
        return this.queryParams.next({
          $sort: { createdAt: -1 },
          $limit: 10,
          $skip: 0,
          inOut: false
        })
      }
    }
  }

  loadSearch(query) {
    this.allToggle = true;
    this.inToggle = false;
    this.outToggle = false;
    if (query == "") {
      this.queryParams.next({
        $sort: { createdAt: -1 },
        $limit: 10,
        $skip: 0
      });
    } else {
      this.queryParams.next({
        $sort: { createdAt: -1 },
        $skip: 0,
        $or: [
          { product: query },
          { assignee: query }
        ]
      })
    }
  }

  ngOnDestroy() {
    this.searchSub.unsubscribe();
  }

}
