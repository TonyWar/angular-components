import { Directive, ElementRef, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[clickOutside]'
})
export class ClickOutsideDirective {

  constructor(private readonly _elementRef: ElementRef) { }

  @Output() readonly clickOutside: EventEmitter<undefined> = new EventEmitter();

  // tslint:disable-next-line: no-any
  @HostListener('document:click', ['$event.target']) onMouseEnter(targetElement: any): void {
    const clickedInside = this._elementRef.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.clickOutside.emit();
    }
  }
}
