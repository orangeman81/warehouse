import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { Subscription } from 'rxjs';

@Component({
  selector: 'wh-wh-details',
  templateUrl: './wh-details.component.html',
  styleUrls: ['./wh-details.component.scss']
})
export class WhDetailsComponent implements OnInit {

  detailsSub: Subscription;
  details: Product;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.detailsSub = this.route.data
      .subscribe(data => {
        this.details = data['details'];
      });
  }

}
