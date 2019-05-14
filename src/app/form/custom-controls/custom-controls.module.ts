import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputModule } from './input/input.module';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    InputModule
  ]
})
export class CustomControlsModule { }
