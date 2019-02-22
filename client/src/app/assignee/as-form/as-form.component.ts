import { Assignee } from '../../models/assignee';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Filters } from 'src/app/models/filters';
import { Component, OnInit, Input, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'wh-as-form',
  templateUrl: './as-form.component.html',
  styleUrls: ['./as-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AsFormComponent implements OnInit {

  assigneeForm = new FormGroup({
    name: new FormControl(''),
    surname: new FormControl(''),
    email: new FormControl('', [Validators.email]),
    phone: new FormControl(''),
    note: new FormControl(''),
  });

  @Input()
  data: Assignee;

  @Output()
  save: EventEmitter<FormData> = new EventEmitter<FormData>();

  ngOnInit() {
    if (this.data) {
      this.assigneeForm.setValue({
        name: this.data.name,
        surname: this.data.surname,
        email: this.data.email,
        phone: this.data.phone,
        note: this.data.note,
      });
    }
  }

}
