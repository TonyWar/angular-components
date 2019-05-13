import { Component, OnInit, forwardRef, ViewChild, Renderer2, ElementRef, AfterViewInit, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

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
      let hasNotZero = false;
      leftPart = leftPart
        .split('')
        .map((char, index, array) => {
          if (index + 1 === array.length || hasNotZero) {
            return char;
          }

          if (array[index] === '0') {
            return '';
          } else {
            hasNotZero = true;
          }

          return char;
        })
        .join('');
    }
    leftPart = leftPart
      .split('')
      .reverse()
      .join('')
      .replace(/(\d{3})/g, '$1 ')
      .replace(/(^\s+|\s+$)/, '')
      .split('')
      .reverse()
      .join('');

    // tslint:disable-next-line: strict-boolean-expressions
    rightPart = rightPart || '';

    return `${leftPart}${hasDot ? '.' : ''}${rightPart}`;
  }

  set value(value: string) {
    const fixedValue = value.replace(/( )/g, '');
    this._value = this.getNumberWithDecimalsFromString(fixedValue, this.roundTo);
  }

  @ViewChild('input') inputRef?: ElementRef;

  // Writes a new value to the element.
  writeValue(value: string): void {
    this.value = value;
    if (this.inputRef) {
      this.renderer.setProperty(this.inputRef.nativeElement, 'value', this.value);
    }
  }

  getNumberWithDecimalsFromString = (value: string, toString: number = 2): string => {
    const regex1 = /^[0-9.,]$/;
    const regex2 = new RegExp(`^[0-9]{1,13}([,.][0-9]{0,${toString}})?$`);
    const anArray = String(value)
      .replace(/,/g, '.')
      .split('');
    for (let i = 0; i < anArray.length; i++) {
      if (!regex1.test(anArray[i])) {
        anArray[i] = '';
      }
    }
    anArray
      .join('')
      .split('');

    const arr = [];
    for (let i = 0; i < anArray.length; i++) {
      let temp = '';
      for (let j = 0; j <= i; j++) {
        temp += anArray[j];
      }
      if (regex2.test(temp)) {
        arr.push(anArray[i]);
      }
    }

    return arr.join('');
  };

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
