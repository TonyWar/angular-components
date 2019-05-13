import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmountInputComponent } from './components/amount-input/amount-input.component';

@NgModule({
  declarations: [
    AmountInputComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AmountInputComponent
  ]
})
export class InputModule { }
