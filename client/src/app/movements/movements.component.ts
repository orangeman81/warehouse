import { Assignee } from 'src/app/models/assignee';
import { Paginated } from '@feathersjs/feathers';
import { ApiService } from 'src/app/services/api.service';
import { Subscription, Observable, BehaviorSubject } from 'rxjs';
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
  search: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  queryParams: any;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.loadMovements(0);
  }

  loadMovements(skip: number) {
    this.searchSub = this.search
      .pipe(
        switchMap((active: Boolean) => {
          console.log(active);
          if (!active) {
            this.queryParams = {
              $sort: { createdAt: -1 },
              $limit: 10,
              $skip: skip
            }
          } else {
            // this.queryParams.$skip = skip;
            console.log("skip ", this.queryParams.$skip)
          }
          return this.api.$connect('movements', this.queryParams)
        })
      ).subscribe((res: Paginated<any>) => {
        this.movLength = res.total;
        this.movements = res.data;
        console.log(res.total)
      })
  }

  filterMovements(value: number) {
    switch (value) {
      case 1: {
        this.allToggle = true;
        this.inToggle = false;
        this.outToggle = false;
        this.queryParams = {
          $sort: { createdAt: -1 },
          $limit: 10,
          $skip: 0
        }
        return this.search.next(false);
      }
      case 2: {
        this.allToggle = false;
        this.inToggle = true;
        this.outToggle = false;
        this.queryParams = {
          $sort: { createdAt: -1 },
          $limit: 10,
          $skip: 0,
          inOut: true
        }
        return this.search.next(true);
      }
      case 3: {
        this.allToggle = false;
        this.inToggle = false;
        this.outToggle = true;
        this.queryParams = {
          $sort: { createdAt: -1 },
          $limit: 10,
          $skip: 0,
          inOut: false
        }
        return this.search.next(true);
      }
    }
  }

  loadSearch(query) {
    this.allToggle = true;
    this.inToggle = false;
    this.outToggle = false;
    if (query == "") {
      this.search.next(false);
    } else {
      this.queryParams = {
        $sort: { createdAt: -1 },
        $or: [
          { product: query },
          { assignee: query }
        ]
      }
      this.search.next(true);
    }
  }

  ngOnDestroy() {
    this.searchSub.unsubscribe();
  }

}
