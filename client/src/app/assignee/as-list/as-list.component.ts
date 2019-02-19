import { Component, OnInit } from '@angular/core';
import { selectAssigneePage, selectAssigneeQuery } from '../store/assignee.selectors';
import { AssigneesRequest, AssigneeDeleteReq } from '../store/assignee.actions';
import { State } from 'src/app/reducers';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from './../../models/product';
import { Assignee } from '../../models/assignee';
import { Incoming } from 'src/app/models/incoming';

@Component({
  selector: 'wh-as-list',
  templateUrl: './as-list.component.html',
  styleUrls: ['./as-list.component.scss']
})
export class AsListComponent implements OnInit {

  assignees: Observable<Product[] | Assignee[] | Incoming[]>;
  asLength: number;

  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.loadAssignees(0);
  }

  loadAssignees(skip) {
    this.store.dispatch(new AssigneesRequest());
    this.assignees = this.store
      .pipe(
        select(selectAssigneePage(skip)),
        map(data => {
          this.asLength = data.total;
          return data.data;
        })
      );
  }

  loadSearch(query: string) {
    if (query === "") {
      this.loadAssignees(0);
    } else {
      this.assignees = this.store
        .pipe(
          select(selectAssigneeQuery(query)),
          map(data => {
            this.asLength = 0;
            return data;
          })
        );
    }
  }

}
