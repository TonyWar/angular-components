import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmountFormComponent } from './components/amount-form/amount-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomControlsModule } from '../custom-controls/custom-controls.module';
import { BankCardFormComponent } from './components/bank-card-form/bank-card-form.component';

@NgModule({
  declarations: [
    AmountFormComponent,
    BankCardFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CustomControlsModule
  ],
  exports: [
    AmountFormComponent,
    BankCardFormComponent
  ]
})
export class CustomFormsModule { }
