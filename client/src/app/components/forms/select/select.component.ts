import {
  Component,
  HostListener,
  Input,
  ChangeDetectionStrategy,
  ElementRef
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { noop } from 'rxjs';

@Component({
  selector: 'wh-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  host: {
    'class': 'formGroup'
  },
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: SelectComponent, multi: true }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectComponent implements ControlValueAccessor {

  @Input()
  options: string[];

  @Input()
  label: string;

  get placeholder() {
    return 'select ' + this.label.toLowerCase();
  }

  // UI logic
  private open: boolean;
  @HostListener('click') activated() {
    this.open == true ? this.open = false : this.open = true;
  }
  // TODO: Fix logic, close only if already clicked
  @HostListener('document: click', ['$event']) clickOut(event: MouseEvent): void {
    const targetElement = event.target as HTMLElement;
    const clickedInside = this._elementRef.nativeElement.contains(targetElement);
    event.stopPropagation();
    if (!clickedInside && targetElement && this.open) {
      this.open = false;
    }
  }

  // VALUE ACCESSOR logic
  get selectValue() {
    return this._value
  }
  set selectValue(value: string) {
    this._value = value;
    this.onChangeCallback(value);
  }

  _value: string = '';

  constructor(private _elementRef: ElementRef) { }

  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  writeValue(value: string): void {
    if (value !== this._value) {
      this.selectValue = value;
    }
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

}