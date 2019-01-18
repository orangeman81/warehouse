import { FormGroup, FormControl } from '@angular/forms';
import { Component, ChangeDetectionStrategy, Output, EventEmitter, OnInit, Input } from '@angular/core';
import { Filters } from 'src/app/models/filters';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'wh-wh-form',
  templateUrl: './wh-form.component.html',
  styleUrls: ['./wh-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WhFormComponent implements OnInit {

  filters = new Filters();
  prodForm = new FormGroup({
    name: new FormControl(''),
    serial: new FormControl(''),
    type: new FormControl(''),
    note: new FormControl(''),
    conditions: new FormControl(''),
    assignee: new FormControl(''),
  });

  @Input()
  data: Product;

  @Output()
  save: EventEmitter<FormData> = new EventEmitter<FormData>();

  ngOnInit() {
    if (this.data) {
      this.prodForm.setValue({
        name: this.data.name,
        serial: this.data.serial,
        type: this.data.type,
        note: this.data.note,
        conditions: this.data.conditions,
        assignee: this.data.assignee
      });
    }
  }

}
