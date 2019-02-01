import { FormGroup, FormControl } from '@angular/forms';
import { Component, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'wh-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginFormComponent {

  loginForm: FormGroup = new FormGroup({
    username: new FormControl(""),
    // email: new FormControl(""),
    password: new FormControl("")
  });

  @Output()
  save: EventEmitter<FormData> = new EventEmitter<FormData>();

  constructor() { }

}
