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
    serial: new FormControl(''),
    type: new FormControl(''),
    note: new FormControl(''),
    conditions: new FormControl(''),
    checkInId: new FormControl(''),
    arrivalDate: new FormControl(null)
  });

  @Input()
  data: Product;

  @Input()
  incoming: Incoming;

  @Output()
  save: EventEmitter<FormData> = new EventEmitter<FormData>();

  ngOnInit() {
    if (this.incoming) this.prodForm.patchValue({
      name: this.incoming.description,
      serial: this.incoming.serial,
      checkInId: this.incoming._id,
      arrivalDate: this.incoming.checkInDate
    });
    if (this.data) {
      this.prodForm.patchValue({
        assigneeId: this.data.assigneeId,
        name: this.data.name,
        producer: this.data.producer,
        serial: this.data.serial,
        type: this.data.type,
        note: this.data.note,
        conditions: this.data.conditions,
        checkInId: this.data.checkInId,
        arrivalDate: this.data.arrivalDate
      });
    }
  }

}
