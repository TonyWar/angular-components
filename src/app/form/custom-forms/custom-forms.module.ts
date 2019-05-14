import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmountFormComponent } from './components/amount-form/amount-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AmountFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    AmountFormComponent
  ]
})
export class CustomFormsModule { }
