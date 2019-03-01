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

  toggleControl(allToggle: boolean, inToggle: boolean, outToggle: boolean) {
    this.allToggle = allToggle;
    this.inToggle = inToggle;
    this.outToggle = outToggle;
  }

  filterMovements(value: number) {
    switch (value) {
      case 1: {
        if (this.allToggle) {
          return null;
        } else {
          this.toggleControl(true, false, false);
          return this.queryParams.next({
            $sort: { createdAt: -1 },
            $limit: 10,
            $skip: 0
          })
        }

      }
      case 2: {
        if (this.inToggle) {
          return null;
        } else {
          this.toggleControl(false, true, false);
          return this.queryParams.next({
            $sort: { createdAt: -1 },
            $limit: 10,
            $skip: 0,
            inOut: true
          })
        }
      }
      case 3: {
        if (this.outToggle) {
          return null;
        } else {
          this.toggleControl(false, false, true);
          return this.queryParams.next({
            $sort: { createdAt: -1 },
            $limit: 10,
            $skip: 0,
            inOut: false
          })
        }
      }
    }
  }

  loadSearch(query) {
    this.toggleControl(true, false, false);
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
