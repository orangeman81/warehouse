import { Subscription } from 'rxjs';
import { ApiService } from './../../services/api.service';
import { FeathersService } from './../../services/feathers.service';
import { Component, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'wh-in-create',
  templateUrl: './in-create.component.html',
  styleUrls: ['./in-create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InCreateComponent implements OnDestroy {

  operationSub: Subscription;

  constructor(private api: ApiService, private router: Router) { }

  save(payload) {
    this.operationSub = this.api.$create('incoming', payload)
      .subscribe();
    this.router.navigate(['/incoming'])
  }

  ngOnDestroy() {
    this.operationSub ? this.operationSub.unsubscribe() : null;
  }

}
