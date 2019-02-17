import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Incoming } from 'src/app/models/incoming';

@Component({
  selector: 'wh-in-form',
  templateUrl: './in-form.component.html',
  styleUrls: ['./in-form.component.scss']
})
export class InFormComponent implements OnInit {

  inForm = new FormGroup({
    description: new FormControl(''),
    sender: new FormControl(''),
    recipient: new FormControl(''),
    serial: new FormControl(''),
    checkInDate: new FormControl(Date.now()),
    user: new FormControl(''),
    cheked: new FormControl(false)
  });

  @Input()
  data: Incoming;

  @Output()
  save: EventEmitter<FormData> = new EventEmitter<FormData>();

  ngOnInit() {
    if (this.data) {
      this.inForm.patchValue({
        description: this.data.description,
        sender: this.data.sender,
        recipient: this.data.recipient,
        serial: this.data.serial,
        checkInDate: this.data.checkInDate,
        user: this.data.user,
        cheked: this.data.cheked
      });
    }
  }

}
