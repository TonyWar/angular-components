import { Component, Input, HostBinding, Output, EventEmitter } from '@angular/core';
import { Highlightable } from '@angular/cdk/a11y';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.less']
})
export class ListItemComponent implements Highlightable {
  @Input() item: any;
  @Input() filteredField: any;
  public _isActive = false;

  @HostBinding('class.active') get isActive(): boolean {
    return this._isActive;
  }

  @Output() readonly customClick: EventEmitter<string> = new EventEmitter<string>();
  handleClick = (e: Event): void => {
    this.customClick.emit(this.item.id);
  };

  handleMouseDown(e: Event): void {
    e.stopImmediatePropagation(); // stops event bubbling
    e.preventDefault();  // stops default browser action (focus)
  }

  setActiveItem(): void {
    this.setActiveStyles();
  }

  setActiveStyles(): void {
    this._isActive = true;
  }

  setInactiveStyles(): void {
    this._isActive = false;
  }

  getLabel() {
    return this.item[this.filteredField];
  }
}
