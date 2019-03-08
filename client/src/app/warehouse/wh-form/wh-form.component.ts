import { FormGroup, FormControl } from '@angular/forms';
import { Component, ChangeDetectionStrategy, Output, EventEmitter, OnInit, Input } from '@angular/core';
import { Filters } from 'src/app/models/filters';
import { Product } from 'src/app/models/product';
import { Incoming } from 'src/app/models/incoming';

@Component({
  selector: 'wh-wh-form',
  templateUrl: './wh-form.component.html',
  styleUrls: ['./wh-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WhFormComponent implements OnInit {

  filters = new Filters();
  prodForm = new FormGroup({
    assigneeId: new FormControl(''),
    name: new FormControl(''),
    producer: new FormControl(''),
    type: new FormControl(''),
    conditions: new FormControl(''),
    description: new FormControl(''),
    serial: new FormControl(''),
    sender: new FormControl(''),
    consignee: new FormControl(''),
    user: new FormControl(''),
    checkInDate: new FormControl('')
  });

  @Input()
  data: Product;

  @Input()
  incoming: Incoming;

  @Output()
  save: EventEmitter<FormData> = new EventEmitter<FormData>();

  get conditions() {
    return this.prodForm.value().conditions;
  }
  set conditions(value: string) {
    this.prodForm.patchValue({
      conditions: value
    })
  }

  get type() {
    return this.prodForm.value().type;
  }
  set type(value: string) {
    this.prodForm.patchValue({
      type: value
    })
  }

  ngOnInit() {
    if (this.incoming) {
      this.prodForm.patchValue(this.incoming);
    }
    if (this.data) {
      this.prodForm.patchValue(this.data);
    }
  }

}
