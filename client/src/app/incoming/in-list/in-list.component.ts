import { Incoming } from 'src/app/models/incoming';
import { Paginated } from '@feathersjs/feathers';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'wh-in-list',
  templateUrl: './in-list.component.html',
  styleUrls: ['./in-list.component.scss']
})
export class InListComponent implements OnInit, OnDestroy {

  incoming: Observable<Incoming[]>;
  incomingLength: number;
  operationSub: Subscription;
  dialog: boolean;
  dialogPayload: Incoming;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.incoming = this.api.$connect('incoming')
      .pipe(
        map((res: Paginated<any>) => {
          this.incomingLength = res.total;
          return res.data;
        })
      )
  }

  openDialog(prod) {
    this.dialogPayload = prod;
    this.dialog = true;
  }

  delete(id: string = this.dialogPayload._id) {
    this.operationSub = this.api.$delete('incoming', id)
      .subscribe();
    this.dialog = false;
  }

  ngOnDestroy() {
    this.operationSub ? this.operationSub.unsubscribe() : null;
  }

}
