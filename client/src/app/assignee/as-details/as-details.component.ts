import { AssigneeUpdated } from './../store/assignee.actions';
import { Update } from '@ngrx/entity';
import { State } from 'src/app/reducers';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { Assignee } from './../../models/assignee';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'wh-as-details',
  templateUrl: './as-details.component.html',
  styleUrls: ['./as-details.component.scss']
})
export class AsDetailsComponent implements OnInit, OnDestroy {

  detailsSub: Subscription;
  details: Assignee;
  toUpdate: boolean = false;
  toggleIcon: string = "update";

  constructor(private route: ActivatedRoute, private store: Store<State>) { }

  ngOnInit() {
    this.detailsSub = this.route.data
      .subscribe(data => {
        this.details = data['details'];
      });
  }

  update(payload) {
    const assignee: Update<Assignee> = {
      id: this.details.id,
      changes: payload
    }
    this.store.dispatch(new AssigneeUpdated({assignee}));
  }

  toggleUpdate() {
    if(this.toUpdate) {
      this.toUpdate = false;
      this.toggleIcon = "update"
    } else {
      this.toUpdate = true;
      this.toggleIcon = "details"
    }
  }

  ngOnDestroy() {
    this.detailsSub.unsubscribe();
  }

}
