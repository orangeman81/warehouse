import { Incoming } from 'src/app/models/incoming';
import { map } from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AllIncomingRequest, IncomingDeleteReq } from '../store/incoming.actions';
import { Store, select } from '@ngrx/store';
import { State } from 'src/app/reducers';
import { Product } from 'src/app/models/product';
import { Assignee } from 'src/app/models/assignee';
import { selectIncomingPage, selectIncomingQuery } from '../store/incoming.selectors';

@Component({
  selector: 'wh-in-list',
  templateUrl: './in-list.component.html',
  styleUrls: ['./in-list.component.scss']
})
export class InListComponent implements OnInit, OnDestroy {

  incoming: Observable<Product[] | Assignee[] | Incoming[]>;
  incomingLength: number;
  operationSub: Subscription;
  dialog: boolean;
  dialogPayload: Incoming;

  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.loadIncoming(0)
  }

  loadIncoming(skip) {
    this.store.dispatch(new AllIncomingRequest());
    this.incoming = this.store
      .pipe(
        select(selectIncomingPage(skip)),
        map(data => {
          this.incomingLength = data.total;
          return data.data;
        })
      );
  }

  loadSearch(query: string) {
    if (query === "") {
      this.loadIncoming(0);
    } else {
      this.incoming = this.store
        .pipe(
          select(selectIncomingQuery(query)),
          map(data => {
            this.incomingLength = 0;
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
    this.store.dispatch(new IncomingDeleteReq({ incomingId: id }));
    this.dialog = false;
  }

  ngOnDestroy() {
    this.operationSub ? this.operationSub.unsubscribe() : null;
  }

}
