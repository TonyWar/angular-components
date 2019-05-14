import { Component, Input, HostBinding, Output, EventEmitter } from '@angular/core';
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
    e.preventDefault();
    e.stopPropagation();
    this.customClick.emit(this.item.id);
  }

  handleMouseDown(e: any) {
    console.log('mouse down');
    e.stopImmediatePropagation(); //stops event bubbling    
    e.preventDefault();  //stops default browser action (focus)
  }

  setActiveItem() {
    this.setActiveStyles();
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
