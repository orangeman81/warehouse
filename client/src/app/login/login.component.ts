import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'wh-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {

  authSub: Subscription;

  constructor(private auth: AuthService) { }

  signIn(credentials) {
    this.authSub = this.auth.$login(credentials)
      .subscribe();
  }

  ngOnDestroy() {
    this.authSub ? this.authSub.unsubscribe() : null;
  }

}
