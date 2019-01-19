import { FormControl, FormGroup } from '@angular/forms';
import { Component, Output, EventEmitter, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { distinctUntilChanged, debounceTime, map } from 'rxjs/operators';

@Component({
  selector: 'wh-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchBarComponent implements OnInit, OnDestroy {

  querySub: Subscription;
  queryForm: FormGroup = new FormGroup({
    query: new FormControl("")
  })

  @Output()
  sendQuery: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
    this.querySub = this.queryForm.valueChanges
      .pipe(
        debounceTime(600),
        distinctUntilChanged(),
        map(query => query.query)
      )
      .subscribe((changes: string) => {
        this.sendQuery.emit(changes);
      })
  }

  ngOnDestroy() {
    this.querySub.unsubscribe();
  }

}
