import { Component, OnDestroy } from '@angular/core';
import { WarehouseService } from 'src/app/services/warehouse.service';
import { Subscription, noop } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'wh-wh-create',
  templateUrl: './wh-create.component.html',
  styleUrls: ['./wh-create.component.scss']
})
export class WhCreateComponent implements OnDestroy {

  operationSub: Subscription;
  constructor(private ws: WarehouseService, private router: Router) { }

  save(payload) {
    this.operationSub = this.ws.$createProduct(payload)
      .subscribe(
        noop,
        console.log,
        () => {
          this.router.navigate(['/warehouse']);
        },
      );
  }

  ngOnDestroy() {
    if (this.operationSub) {
      this.operationSub.unsubscribe();
    }
  }

}
