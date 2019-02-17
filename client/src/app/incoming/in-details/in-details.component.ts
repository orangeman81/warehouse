import { Subscription, throwError } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Incoming } from 'src/app/models/incoming';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'wh-in-details',
  templateUrl: './in-details.component.html',
  styleUrls: ['./in-details.component.scss']
})
export class InDetailsComponent implements OnInit {

  details: Incoming;
  detailsSub: Subscription;
  operationSub: Subscription;
  toUpdate: boolean = false;
  toggleIcon: string = "update";

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private router: Router
  ) { }

  ngOnInit() {
    this.detailsSub = this.route.data
      .subscribe(data => {
        this.details = data['details'];
      });
  }

  update(payload) {
    const incoming = {
      id: this.details._id,
      changes: payload
    }
    this.operationSub = this.api.$update('incoming', incoming)
      .subscribe(
        () => { },
        (err) => { throwError(err) },
        () => { this.router.navigate(['incoming']) }
      );
  }

  toggleUpdate() {
    if (this.toUpdate) {
      this.toUpdate = false;
      this.toggleIcon = "update";
    } else {
      this.toUpdate = true;
      this.toggleIcon = "details";
    }
  }

  ngOnDestroy() {
    this.detailsSub.unsubscribe();
    this.operationSub ? this.operationSub.unsubscribe() : null;
  }

}
