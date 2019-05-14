import { Component, ViewChildren, QueryList, AfterViewInit, ViewChild, ElementRef, Input } from '@angular/core';
import { ListItemComponent } from '../list-item/list-item.component';
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { ENTER } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-searchable-list',
  templateUrl: './searchable-list.component.html',
  styleUrls: ['./searchable-list.component.less']
})
export class SearchableListComponent implements AfterViewInit {
  @Input() data: any;
  @Input() filteredField: any;
  @ViewChildren(ListItemComponent) items: QueryList<ListItemComponent> | undefined;
  @ViewChild('input') input?: ElementRef;

  private keyManager: ActiveDescendantKeyManager<ListItemComponent> | undefined;
  public active = false;
  public model = '';

  ngAfterViewInit() {
    this.keyManager = new ActiveDescendantKeyManager(this.items!)
    .withWrap()
    .withTypeAhead();
  }

  onKeydown(event: any) {
    if (event.keyCode === ENTER) {
      this.model = this.keyManager!.activeItem!.getLabel();
    } else {
      this.keyManager!.onKeydown(event);
    }
  }

  handleCustomClick(id: string) {
    const index = this.items!.toArray().findIndex((list: ListItemComponent) => list.item.id === id);
    this.keyManager!.setActiveItem(index);
    this.model = this.keyManager!.activeItem!.getLabel();
  }
}
