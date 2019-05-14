import { Directive, ElementRef, HostListener } from '@angular/core';
import { CreditCard } from '../shared/credit-card';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[cvvNumber]'
})

export class CvvFormatDirective {

  public target: HTMLInputElement;

  constructor(private readonly el: ElementRef) {
    this.target = this.el.nativeElement;
  }

  @HostListener('keypress', ['$event']) onKeypress(e: KeyboardEvent): void {
    // tslint:disable-next-line: deprecation
    if (!CreditCard.restrictNumeric(e) && !CreditCard.restrictCVV(e.which, this.target)) {
      e.preventDefault();
    }
  }
  @HostListener('paste', ['$event']) onPaste(e: Event): void {
    this.reformatCvc(e);
  }
  @HostListener('change', ['$event']) onChange(e: Event): void {
    this.reformatCvc(e);
  }
  @HostListener('input', ['$event']) onInput(e: Event): void {
    this.reformatCvc(e);
  }


  private reformatCvc(e: Event): void {
    setTimeout(() => {
      let val = CreditCard.replaceFullWidthChars(this.target.value);
      val = val.replace(/\D/g, '')
        .slice(0, 4);
      this.target.selectionStart = this.target.selectionEnd = CreditCard.safeVal(val, this.target);
    });
  }

}
