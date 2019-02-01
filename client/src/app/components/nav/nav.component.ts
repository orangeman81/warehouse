import { AuthService } from './../../services/auth/auth.service';
import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'wh-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavComponent {

  constructor(private auth: AuthService) { }

}
