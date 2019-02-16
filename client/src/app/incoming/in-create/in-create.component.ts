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

  constructor(private api: FeathersService, private router: Router) { }

  save(payload) {
    this.api
      .service('incoming')
      .create(payload)
    this.router.navigate(['/incoming'])
  }

  ngOnDestroy() {

  }

}
