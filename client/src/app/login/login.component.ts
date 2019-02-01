import { LoginRequest } from './../models/loginRequest';
import { AuthService } from '../services/auth/auth.service';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'wh-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {

  authSub: Subscription;

  constructor(private auth: AuthService, private router: Router) { }

  signUp(credentials) {
    this.authSub = this.auth.$login(credentials)
      .subscribe(
        (res: LoginRequest) => {
          console.log(res)
        },
        (err) => console.log,
        () => {
          this.router.navigate(['main']);
        })
  }

  ngOnDestroy() {
    this.authSub ? this.authSub.unsubscribe() : null;
  }

}
