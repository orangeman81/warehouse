import { Router, NavigationStart, RoutesRecognized } from '@angular/router';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'wh-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoaderComponent {

  loading$: Observable<boolean>;

  constructor(private router: Router) { }

  ngOnInit() {
    this.loading$ = this.router.events
      .pipe(
        map(event => event instanceof NavigationStart || event instanceof RoutesRecognized)
      );
  }
}
