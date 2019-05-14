import { Component,  Input, HostBinding, Output, EventEmitter } from '@angular/core';
import { Highlightable } from '@angular/cdk/a11y';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.less']
})
export class ListItemComponent implements Highlightable {
  @Input() item: any;
  public _isActive = false;

  @HostBinding('class.active') get isActive() {
    return this._isActive;
  };

  @Output() customClick = new EventEmitter<string>();
  handleClick = (e: any) => {
    this.customClick.emit(this.item.id);
  }

  setActiveStyles() {
    this._isActive = true;
  };

  setInactiveStyles() {
    this._isActive = false;
  }

  getLabel() {
    return this.item.name;
  }
}
