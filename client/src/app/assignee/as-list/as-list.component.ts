import { Product } from './../../models/product';
import { map } from 'rxjs/operators';
import { AssigneesRequest, AssigneeDeleteReq } from '../store/assignee.actions';
import { State } from 'src/app/reducers';
import { Store, select } from '@ngrx/store';
import { Assignee } from '../../models/assignee';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { selectAssigneePage, selectAssigneeQuery } from '../store/assignee.selectors';

@Component({
  selector: 'wh-as-list',
  templateUrl: './as-list.component.html',
  styleUrls: ['./as-list.component.scss']
})
export class AsListComponent implements OnInit {

  assignees: Observable<Product[] | Assignee[]>;
  asLength: number;
  dialog: boolean;
  dialogPayload: Product;

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

  openDialog(prod) {
    this.dialogPayload = prod;
    this.dialog = true;
  }

  delete(id: string = this.dialogPayload._id) {
    this.store.dispatch(new AssigneeDeleteReq({ assigneeId: id }));
    this.dialog = false;
  }

}
