import { ControlValueAccessor } from '@angular/forms';

export class InputAccessor implements ControlValueAccessor {
  public value = '';
  public disabled = false;

  // Навешиваем на событие, возвращающее новое значение
  // tslint:disable-next-line: no-any
  onInputChange(event: any): void {
    const value = event.target.value;
    this.onChange(value);
  }

  // Writes a new value to the element.
  writeValue(value: string): void {
    this.value = value;
    this.onChange(value);
  }

  // Registers a callback function that is called when the control's value changes in the UI.
  // tslint:disable-next-line: no-any
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  // Registers a callback function is called by the forms API on initialization to update the form model on blur.
  // tslint:disable-next-line: no-any
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onChange = (value: string) => { };
  onTouched = (value: string) => { };

  // Function that is called by the forms API when the control status changes to or from 'DISABLED'.
  // Depending on the status, it enables or disables the appropriate DOM element.
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
