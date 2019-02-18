import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { Incoming } from 'src/app/models/incoming';

@Component({
  selector: 'wh-in-form',
  templateUrl: './in-form.component.html',
  styleUrls: ['./in-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InFormComponent implements OnInit {

  inForm = new FormGroup({
    description: new FormControl(''),
    serial: new FormControl(''),
    sender: new FormControl(''),
    consignee: new FormControl(''),
    checkInDate: new FormControl(Date.now()),
    user: new FormControl(''),
    cheked: new FormControl(false)
  });

  @Input()
  data: Incoming;

  @Input()
  username: string;

  @Output()
  save: EventEmitter<FormData> = new EventEmitter<FormData>();

  ngOnInit() {
    if (this.username) {
      this.inForm.patchValue({ user: this.username })
    }
    if (this.data) {
      this.inForm.patchValue({
        description: this.data.description,
        serial: this.data.serial,
        sender: this.data.sender,
        consignee: this.data.consignee,
        checkInDate: this.data.checkInDate,
        user: this.data.user,
        cheked: this.data.cheked
      });
    }
  }

}
