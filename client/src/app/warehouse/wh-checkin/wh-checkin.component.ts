import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Incoming } from 'src/app/models/incoming';
import { Store } from '@ngrx/store';
import { State } from 'src/app/reducers';
import { productCreated } from '../store/warehouse.actions';
import { IncomingUpdate } from 'src/app/incoming/store/incoming.actions';
import { Update } from '@ngrx/entity';

@Component({
  selector: 'wh-wh-checkin',
  templateUrl: './wh-checkin.component.html',
  styleUrls: ['./wh-checkin.component.scss']
})
export class WhCheckinComponent implements OnInit {

  incoming: Incoming;
  incomingSub: Subscription;

  constructor(private route: ActivatedRoute, private store: Store<State>) { }

  ngOnInit() {
    this.incomingSub = this.route.data
      .subscribe(data => this.incoming = data['incoming'])
  }

  save(payload) {
    this.incoming.checked = true;
    const incoming: Update<Incoming> = {
      id: this.incoming._id,
      changes: this.incoming
    }
    this.store.dispatch(new productCreated(payload))
    this.store.dispatch(new IncomingUpdate({ incoming }))
  }

}
