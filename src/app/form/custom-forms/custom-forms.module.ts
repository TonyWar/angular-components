import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmountFormComponent } from './components/amount-form/amount-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomControlsModule } from '../custom-controls/custom-controls.module';

@NgModule({
  declarations: [
    AmountFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CustomControlsModule
  ],
  exports: [
    AmountFormComponent
  ]
})
export class CustomFormsModule { }
