import { Component, OnInit, forwardRef, ViewChild, Renderer2, ElementRef, AfterViewInit, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { getNumberWithDecimalsFromString, removeZeroDuplicates, numberToStringFormat } from '../../helpers/index';

@Component({
  selector: 'app-amount-input',
  templateUrl: './amount-input.component.html',
  styleUrls: ['./amount-input.component.less'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      // tslint:disable-next-line: no-forward-ref
      useExisting: forwardRef(() => AmountInputComponent),
      multi: true
    }
  ]
})
export class AmountInputComponent implements ControlValueAccessor, OnInit, AfterViewInit {
  public disabled = false;
  @Input() roundTo = 2;

  private _value = '';
  get value(): string {
    const oldValue = this._value;
    let [leftPart, rightPart] = oldValue.split('.');
    const hasDot: boolean = oldValue.includes('.');
    if (leftPart.length > 1) {
      leftPart = removeZeroDuplicates(leftPart);
    }
    leftPart = numberToStringFormat(leftPart);

    // tslint:disable-next-line: strict-boolean-expressions
    rightPart = rightPart || '';

    return `${leftPart}${hasDot ? '.' : ''}${rightPart}`;
  }

  set value(value: string) {
    const fixedValue = value.replace(/( )/g, '');
    this._value = getNumberWithDecimalsFromString(fixedValue, this.roundTo);
  }

  @ViewChild('input') inputRef?: ElementRef;

  // Writes a new value to the element.
  writeValue(value: string): void {
    this.value = value;
    if (this.inputRef) {
      this.renderer.setProperty(this.inputRef.nativeElement, 'value', this.value);
    }
  }

  handleInput(value: string): void {
    this.value = value;
    if (this.inputRef) {
      this.renderer.setProperty(this.inputRef.nativeElement, 'value', this.value);
    }
    this.onChange(this._value);
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  constructor(
    private readonly renderer: Renderer2
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    if (this.inputRef) {
      this.renderer.setProperty(this.inputRef.nativeElement, 'value', this.value);
    }
  }

  onChange = (value: string) => { };
  onTouched = () => { };

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
