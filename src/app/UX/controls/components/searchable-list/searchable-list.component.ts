import {
  Component,
  ViewChildren,
  QueryList,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Input,
  OnInit,
  ContentChild,
  ContentChildren,
  AfterContentInit,
  Output,
  EventEmitter
} from '@angular/core';
import { ListItemComponent } from '../list-item/list-item.component';
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { ENTER } from '@angular/cdk/keycodes';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-searchable-list',
  templateUrl: './searchable-list.component.html',
  styleUrls: ['./searchable-list.component.less']
})
export class SearchableListComponent implements OnInit, AfterContentInit {
  @Input() keyDownObserver!: Subject<KeyboardEvent>;
  @ContentChildren(ListItemComponent) items!: QueryList<ListItemComponent>;
  private keyManager: ActiveDescendantKeyManager<ListItemComponent> | undefined;
  // public active = false;
  public model = '';
  @Output() readonly selectedItemId = new EventEmitter<string>();

  // TODO: add unsubscribe (maybe by @AutoUnsubscribe)
  ngOnInit(): void {
    this.keyDownObserver.subscribe((event: KeyboardEvent) => {
      this.onKeydown(event);
    });
  }

  ngAfterContentInit(): void {
    this.keyManager = new ActiveDescendantKeyManager(this.items)
      .withWrap()
      .withTypeAhead();
  }

  onKeydown(event: KeyboardEvent): void {
    // tslint:disable-next-line: deprecation
    if (event.keyCode === ENTER && this.keyManager && this.keyManager.activeItem !== null) {
      this.selectedItemId.emit(this.keyManager.activeItem.key);
    } else if (this.keyManager) {
      this.keyManager.onKeydown(event);
    }
  }
}
