import { FormGroup, FormControl } from '@angular/forms';
import { Component, ChangeDetectionStrategy, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'wh-wh-form',
  templateUrl: './wh-form.component.html',
  styleUrls: ['./wh-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WhFormComponent {

  prodForm = new FormGroup({
    name: new FormControl(''),
    serial: new FormControl(''),
  });

  @Output()
  save: EventEmitter<FormData> = new EventEmitter<FormData>();

}
