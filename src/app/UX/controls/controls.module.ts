import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchableListComponent } from './components/searchable-list/searchable-list.component';
import { ListItemComponent } from './components/list-item/list-item.component';
import { FilterPipe } from './pipes/filter.pipe';
import { ClickOutsideDirective } from './directives/click-outside.directive'

@NgModule({
  declarations: [
    SearchableListComponent,
    ListItemComponent,
    FilterPipe,
    ClickOutsideDirective,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SearchableListComponent,
  ]
})
export class ControlsModule { }
