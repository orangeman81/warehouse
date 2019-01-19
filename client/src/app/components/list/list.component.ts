import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'wh-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent {

  constructor() { }

}
