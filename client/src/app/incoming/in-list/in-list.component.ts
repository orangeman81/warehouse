import { Paginated } from '@feathersjs/feathers';
import { Incoming } from './../../models/incoming';
import { FeathersService } from './../../services/feathers.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'wh-in-list',
  templateUrl: './in-list.component.html',
  styleUrls: ['./in-list.component.scss']
})
export class InListComponent implements OnInit {

  incoming: Observable<any>;
  dialog: boolean;
  dialogPayload: Incoming;

  constructor(private api: FeathersService) { }

  ngOnInit() {
    this.incoming = (this.api
      .service('incoming'))
      .watch()
      .find({
        query: {
          $sort: { createdAt: -1 }
        }
      })
      .pipe(
        map((res: Paginated<any>) => res.data)
      );
  }

  openDialog(prod) {
    this.dialogPayload = prod;
    this.dialog = true;
  }

  delete(id: string = this.dialogPayload._id) {
    this.api
      .service('incoming')
      .remove(id)
    this.dialog = false;
  }

}
