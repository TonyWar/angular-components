import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmountFormComponent } from './components/amount-form/amount-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomControlsModule } from '../custom-controls/custom-controls.module';
import { ExampleSearchableListComponent } from './components/example-searchable-list/example-searchable-list.component';
import { ControlsModule } from '../../UX/controls/controls.module';

@NgModule({
  declarations: [
    AmountFormComponent,
    ExampleSearchableListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CustomControlsModule,
    ControlsModule
  ],
  exports: [
    AmountFormComponent,
    ExampleSearchableListComponent
  ]
})
export class CustomFormsModule { }
