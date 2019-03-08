import {
  Component,
  HostListener,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'wh-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectComponent {

  @Input()
  options: string[];

  @Input()
  label: string;

  @Output()
  selected: EventEmitter<string> = new EventEmitter<string>();

  private open: boolean;

  @HostListener('click') activated() {
    this.open == true ? this.open = false : this.open = true;
  }

  get optionValue() {
    return this._value
  }
  set optionValue(value: string) {
    this._value = value;
    this.selected.emit(value);
  }

  _value: string = 'none';

  constructor() { }

}
