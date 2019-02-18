import { State } from 'src/app/reducers';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ApiService } from './../../services/api.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { username } from 'src/app/login/store/auth.selectors';

@Component({
  selector: 'wh-in-create',
  templateUrl: './in-create.component.html',
  styleUrls: ['./in-create.component.scss']
})
export class InCreateComponent implements OnInit, OnDestroy {

  username: string;
  storeSub: Subscription;
  operationSub: Subscription;

  constructor(
    private api: ApiService,
    private router: Router,
    private store: Store<State>
  ) { }

  ngOnInit() {
    this.storeSub = this.store
      .pipe(
        select(username)
      )
      .subscribe(username => this.username = username);
  }

  save(payload) {
    this.operationSub = this.api.$create('incoming', payload)
      .subscribe();
    this.router.navigate(['/incoming']);
  }

  ngOnDestroy() {
    this.storeSub.unsubscribe();
    this.operationSub ? this.operationSub.unsubscribe() : null;
  }

}
